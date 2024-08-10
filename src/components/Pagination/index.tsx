import { ACTION_TYPES, useGridApiContext } from '../../hooks/useAppContext'
import { PageSelect } from '../Controls'

const Pagination = () => {
  const { dispatch, currentPage, totalPages } = useGridApiContext()

  function previous() {
    dispatch({ type: ACTION_TYPES.paginate, payload: currentPage - 1 })
  }

  function next() {
    dispatch({ type: ACTION_TYPES.paginate, payload: currentPage + 1 })
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="w-full py-4 flex justify-between items-center">
      <button
        type="button"
        className="px-4 py-2 bg-slate-500 cursor-pointer rounded-md hover:bg-slate-400"
        onClick={previous}
      >
        Previous
      </button>

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

export default Pagination
