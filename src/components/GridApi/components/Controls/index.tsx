import { ChangeEvent } from 'react'
import { ACTION_TYPES, SortTypes, useGridApiContext } from '../../../../hooks/useGridApiContext'

const Filter = () => {
  const { dispatch, filter } = useGridApiContext()

  return (
    <span className="relative inline-block">
      <input
        className="text-black p-4"
        type="text"
        value={filter}
        placeholder="Search records"
        onChange={e => dispatch({ type: ACTION_TYPES.filter, payload: e.target.value })}
      />
      <button
        className="absolute right-0 top-1/2 -mt-6 p-4"
        type="button"
        onClick={() => dispatch({ type: ACTION_TYPES.filter, payload: '' })}
      >
        X
      </button>
    </span>
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

const NumberOfRecordsDisplay = () => {
  const { numRecordsFiltered, recordType, currentPage, recordsPerPage } = useGridApiContext()
  const rangeEnd = Math.min(numRecordsFiltered, currentPage * recordsPerPage)
  const rangeStart = rangeEnd - (recordsPerPage - 1)

  if (numRecordsFiltered <= 0) {
    return null
  }

  return (
    <div className="w-full text-center">
      Showing {rangeStart <= 0 ? 1 : rangeStart} - {rangeEnd} of {numRecordsFiltered} {recordType}s
    </div>
  )
}

const RecordsPerPageSelector = () => {
  const { dispatch, recordsPerPage } = useGridApiContext()
  return (
    <input
      type="text"
      value={recordsPerPage}
      onFocus={e => e.target.select()}
      onChange={e => dispatch({ type: ACTION_TYPES.recordsPerPage, payload: e.target.value })}
    />
  )
}

export { Filter, Sort, PageSelect, NumberOfRecordsDisplay, RecordsPerPageSelector }
