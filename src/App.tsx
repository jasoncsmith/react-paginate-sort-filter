import { ChangeEvent, ReactNode, useEffect } from 'react'
import { faker } from '@faker-js/faker'

import { useGridApiContext, GridApiProvider, Employee, ACTION_TYPES, SortTypes } from './hooks/useAppContext'

//TODO: make grid configurable by component, refactor, break into modules

const getEmployees = () => {
  const arr: Employee[] = []
  for (let i = 0; i < 150; i++) {
    arr.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      dateStarted: faker.date.past(),
      jobTitle: faker.company.buzzAdjective(),
    })
  }
  return arr
}

const Header = () => {
  return (
    <header className="p-6 border-b-2 border-solid border-gray-700 text-white flex justify-between items-center">
      Super Sort 5000
    </header>
  )
}

const Filter = () => {
  const { dispatch, filter } = useGridApiContext()

  return (
    <input
      className="text-black p-4"
      type="text"
      value={filter}
      placeholder="Search records"
      onChange={e => dispatch({ type: ACTION_TYPES.filter, payload: e.target.value })}
    />
  )
}

const Sort = () => {
  const { dispatch, sortSelection } = useGridApiContext()

  return (
    <select
      className="text-black px-4 cursor-pointer"
      value={sortSelection}
      onChange={e => dispatch({ type: ACTION_TYPES.sort, payload: e.target.value as SortTypes })}
    >
      <option value="asc">Name Ascending</option>
      <option value="desc">Name Descending</option>
      <option value="dateAsc">Date Ascending</option>
      <option value="dateDesc">Date Descending</option>
    </select>
  )
}

const PageSelect = () => {
  const { dispatch, totalPages, currentPage } = useGridApiContext()

  function goToPage(e: ChangeEvent<HTMLSelectElement>) {
    let page = +e.target.value
    dispatch({ type: ACTION_TYPES.paginate, payload: page })
  }

  const arr = Array(totalPages).fill('_')

  return (
    <select value={currentPage} onChange={goToPage}>
      {arr.map((_, idx) => (
        <option key={idx} value={idx + 1}>
          {idx + 1}
        </option>
      ))}
    </select>
  )
}

const Pagination = ({ numItems }: { numItems: number }) => {
  const { dispatch, currentPage, recordsPerPage } = useGridApiContext()
  const totalPages = Math.ceil(numItems / recordsPerPage)

  function previous() {
    // put in reducer
    if (currentPage > 1) {
      dispatch({ type: ACTION_TYPES.paginate, payload: currentPage - 1 })
    }
  }

  function next() {
    // put in reducer
    if (currentPage < totalPages) {
      dispatch({ type: ACTION_TYPES.paginate, payload: currentPage + 1 })
    }
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="py-4 flex justify-between items-center">
      <button
        type="button"
        className="px-4 py-2 bg-slate-500 cursor-pointer rounded-md hover:bg-slate-400"
        onClick={previous}
      >
        Previous
      </button>
      <NumberOfRecordsDisplay />
      <span className="px-4">
        Page <PageSelect /> of {totalPages}
      </span>
      <button
        type="button"
        className="px-4 py-2 bg-slate-500 cursor-pointer rounded-md hover:bg-slate-400"
        onClick={next}
      >
        Next
      </button>
    </div>
  )
}

const NumberOfRecordsDisplay = () => {
  const { records, recordType, currentPage, recordsPerPage } = useGridApiContext()

  return (
    <span>
      Showing {currentPage * recordsPerPage - 4} - {currentPage * recordsPerPage} of {records.length}{' '}
      {recordType}s
    </span>
  )
}

const Table = ({ items }: { items: Employee[] }) => {
  return (
    <table className={'w-full min-w-96 text-left'}>
      <thead>
        <tr>
          <th className="bg-gray-50 p-4 uppercase">name</th>
          <th className="bg-gray-50 p-4 uppercase">email</th>
          <th className="bg-gray-50 p-4 uppercase">job Title</th>
          <th className="bg-gray-50 p-4 uppercase">date</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r, idx) => (
          <tr key={idx}>
            <td className="border-t-2 border-solid border-white p-4">{r.name}</td>
            <td className="border-t-2 border-solid border-white p-4">{r.email}</td>
            <td className="border-t-2 border-solid border-white p-4">{r.jobTitle}</td>
            <td className="border-t-2 border-solid border-white p-4">{r.dateStarted.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const NoResults = () => {
  const { dispatch, filter } = useGridApiContext()

  return (
    <h1 className="py-6 text-xl">
      There are no results that match "{filter}"{' '}
      <button type="button" onClick={() => dispatch({ type: ACTION_TYPES.filter, payload: '' })}>
        ✖
      </button>
    </h1>
  )
}

const GridApi = ({ children }: { children: ReactNode }) => {
  return <div className="w-full">{children}</div>
}
type SortMethodHash = {
  [k in SortTypes]: (a: Employee, b: Employee) => number
}

const sortMethods: SortMethodHash = {
  asc: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
  desc: (a: Employee, b: Employee) => b.name.localeCompare(a.name),
  dateAsc: (a: Employee, b: Employee) =>
    new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime(),
  dateDesc: (a: Employee, b: Employee) =>
    new Date(b.dateStarted).getTime() - new Date(a.dateStarted).getTime(),
}

const Main = () => {
  const { dispatch } = useGridApiContext()
  const { records, currentPage, recordsPerPage, filter, sortSelection } = useGridApiContext()

  const items = records
    .filter(r => r.name.toLowerCase().includes(filter.toLowerCase()))
    .sort(sortMethods[sortSelection])

  const dataToRender = items.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.onload, payload: getEmployees() })
  }, [])

  return (
    <main className={'min-w-96 mx-auto p-6 flex gap-4 flex-wrap'}>
      <GridApi>
        <div className="flex justify-between py-4">
          <Filter />
          <Sort />
        </div>
        {items.length > 0 ? <Table items={dataToRender} /> : <NoResults />}
        <Pagination numItems={items.length} />
      </GridApi>
    </main>
  )
}

const App = () => {
  return (
    <GridApiProvider>
      <div className="app w-[1024px] mx-auto">
        <Header />
        <Main />
      </div>
    </GridApiProvider>
  )
}

export default App
