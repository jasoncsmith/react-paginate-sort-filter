import { createContext, Dispatch, ReactNode, Reducer, useContext, useEffect, useReducer } from 'react'
import { Employee, sortMethods } from '../api/employees'

enum ACTION_TYPES {
  'paginate' = 'paginate',
  'sort' = 'sort',
  'filter' = 'filter',
  'onload' = 'onload',
  'recordsPerPage' = 'recordsPerPage',
}

type SortTypes = 'dateAsc' | 'dateDesc' | 'asc' | 'desc'

interface ActionPaginate {
  type: typeof ACTION_TYPES.paginate
  payload: number
}

interface ActionSort {
  type: typeof ACTION_TYPES.sort
  payload: SortTypes
}

interface ActionFilter {
  type: typeof ACTION_TYPES.filter
  payload: string
}

export interface ActionOnload {
  type: typeof ACTION_TYPES.onload
  payload: Employee[]
}

interface ActionRecordsPerPage {
  type: typeof ACTION_TYPES.recordsPerPage
  payload: string
}

type Action = ActionFilter | ActionSort | ActionPaginate | ActionOnload | ActionRecordsPerPage

interface State {
  records: Employee[]
  numRecordsFiltered: number
  recordsToRender: Employee[] // todo: make generic
  currentPage: number
  filter: string
  sortSelection: SortTypes
  totalPages: number
  recordsPerPage: number
  recordType: string
  dispatch: Dispatch<Action>
}

const GridApiContext = createContext<null | State>(null)

const initialState: State = {
  records: [],
  numRecordsFiltered: 0,
  recordsToRender: [],
  currentPage: 1,
  filter: '',
  sortSelection: 'asc',
  recordsPerPage: 5,
  recordType: 'Employee',
  totalPages: 1,
  dispatch: () => {},
}

function getItems({ records, sortSelection, filter, currentPage, recordsPerPage }: State): {
  recordsToRender: Employee[]
  numRecordsFiltered: number
} {
  const items = records
    .filter(r => r.name.toLowerCase().includes(filter.toLowerCase()))
    .sort(sortMethods[sortSelection])

  const recordsToRender = items.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)

  return { recordsToRender, numRecordsFiltered: items.length }
}

function stateReducer(state: State, action: Action) {
  const { type, payload } = action

  if (type === ACTION_TYPES.paginate) {
    if (payload < 1 || payload > state.totalPages) {
      return state
    }

    const { recordsToRender, numRecordsFiltered } = getItems({ ...state, currentPage: payload })

    return {
      ...state,
      currentPage: payload,
      recordsToRender,
      numRecordsFiltered,
      totalPages: Math.ceil(numRecordsFiltered / state.recordsPerPage),
    }
  }

  if (type === ACTION_TYPES.sort) {
    const { recordsToRender, numRecordsFiltered } = getItems({ ...state, sortSelection: payload })
    return {
      ...state,
      sortSelection: payload,
      recordsToRender,
      currentPage: 1,
      numRecordsFiltered,
      totalPages: Math.ceil(numRecordsFiltered / state.recordsPerPage),
    }
  }

  if (type === ACTION_TYPES.filter) {
    const { recordsToRender, numRecordsFiltered } = getItems({ ...state, filter: payload })
    return {
      ...state,
      filter: payload,
      recordsToRender,
      currentPage: 1,
      numRecordsFiltered,
      totalPages: Math.ceil(numRecordsFiltered / state.recordsPerPage),
    }
  }

  if (type === ACTION_TYPES.onload) {
    const { recordsToRender, numRecordsFiltered } = getItems({ ...state, records: [...payload] })
    return {
      ...state,
      records: [...payload],
      numRecordsFiltered,
      totalPages: Math.ceil(numRecordsFiltered / state.recordsPerPage),
      recordsToRender,
    }
  }

  if (type === ACTION_TYPES.recordsPerPage) {
    const val = Number(payload)
    let num = state.recordsPerPage

    if (val >= 1 && val <= state.records.length) {
      num = val
    }

    const { recordsToRender, numRecordsFiltered } = getItems({ ...state, recordsPerPage: num })

    return {
      ...state,
      recordsToRender,
      currentPage: 1,
      recordsPerPage: num,
      numRecordsFiltered,
      totalPages: Math.ceil(numRecordsFiltered / num),
    }
  }

  return state
}

const GridApiProvider = ({
  children,
  defaultRecordsPerPage,
  type,
  fetcher,
  defaultSort,
}: {
  children: ReactNode
  defaultRecordsPerPage: number
  type: string
  fetcher: () => Employee[]
  defaultSort: SortTypes
}) => {
  const [appState, dispatch] = useReducer<Reducer<State, Action>>(stateReducer, {
    ...initialState,
    recordsPerPage: defaultRecordsPerPage,
    recordType: type,
    sortSelection: defaultSort,
  })

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.onload, payload: fetcher() })
  }, [])

  return <GridApiContext.Provider value={{ ...appState, dispatch }}>{children}</GridApiContext.Provider>
}

const useGridApiContext = () => {
  const state = useContext(GridApiContext)

  if (!state) {
    throw new Error('state must be consumed within provider')
  }

  return state
}

export type { Action, Employee, SortTypes }
export { useGridApiContext, GridApiProvider, ACTION_TYPES }
