import { createContext, Dispatch, ReactNode, Reducer, useContext, useReducer } from 'react'

enum ACTION_TYPES {
  'paginate' = 'paginate',
  'sort' = 'sort',
  'filter' = 'filter',
  'onload' = 'onload',
}

type SortTypes = 'dateAsc' | 'dateDesc' | 'asc' | 'desc'

interface Employee {
  name: string
  email: string
  jobTitle: string
  dateStarted: Date
}

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

interface ActionOnload {
  type: typeof ACTION_TYPES.onload
  payload: Employee[]
}

type Action = ActionFilter | ActionSort | ActionPaginate | ActionOnload

interface State {
  records: Employee[]
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
  currentPage: 1,
  filter: '',
  sortSelection: 'asc',
  recordsPerPage: 5,
  recordType: 'Employee',
  totalPages: 1,
  dispatch: () => {},
}

function stateReducer(state: State, action: Action) {
  const { type, payload } = action

  if (type === ACTION_TYPES.paginate) {
    return { ...state, currentPage: payload }
  }

  if (type === ACTION_TYPES.sort) {
    return { ...state, sortSelection: payload, currentPage: 1 }
  }

  if (type === ACTION_TYPES.filter) {
    return { ...state, filter: payload, currentPage: 1 }
  }

  if (type === ACTION_TYPES.onload) {
    return { ...state, records: [...payload], totalPages: Math.ceil(payload.length / state.recordsPerPage) }
  }

  return state
}

const GridApiProvider = ({ children }: { children: ReactNode }) => {
  const [appState, dispatch] = useReducer<Reducer<State, Action>>(stateReducer, initialState)

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
