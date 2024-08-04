import { ReactNode, useEffect } from 'react'
import { faker } from '@faker-js/faker'

import { useGridApiContext, GridApiProvider, Employee, ACTION_TYPES, SortTypes } from './hooks/useAppContext'

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
      className="text-black"
      type="text"
      value={filter}
      onChange={e => dispatch({ type: ACTION_TYPES.filter, payload: e.target.value })}
    />
  )
}

const Sort = () => {
  const { dispatch, sortSelection } = useGridApiContext()

  return (
    <select
      className="text-black"
      value={sortSelection}
      onChange={e => dispatch({ type: ACTION_TYPES.sort, payload: e.target.value as SortTypes })}
    >
      <option value="">Sort</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
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
    <div className="py-4">
      <button type="button" onClick={previous}>
        Previous
      </button>
      <span className="px-4">
        {currentPage} of {totalPages}
      </span>
      <button type="button" onClick={next}>
        Next
      </button>
    </div>
  )
}

const Table = ({ items }: { items: Employee[] }) => {
  return (
    <table className={'min-w-96'}>
      <thead>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>jobTitle</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r, idx) => (
          <tr key={idx}>
            <td>{r.name}</td>
            <td>{r.email}</td>
            <td>{r.jobTitle}</td>
            <td>{r.dateStarted.toLocaleDateString()}</td>
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
  return <div>{children}</div>
}

const sortMethods: { [k: string]: (a: Employee, b: Employee) => number } = {
  '': () => 0,
  asc: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
  desc: (a: Employee, b: Employee) => b.name.localeCompare(a.name),
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
        <Filter />
        <Sort />
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
