import { ACTION_TYPES, useGridApiContext } from '../../../../hooks/useGridApiContext'

const NoResults = () => {
  const { dispatch, filterValue } = useGridApiContext()

  return (
    <h1 className="py-6 text-xl">
      There are no results that match "{filterValue}"{' '}
      <button type="button" onClick={() => dispatch({ type: ACTION_TYPES.filter, payload: '' })}>
        ✖
      </button>
    </h1>
  )
}

export default NoResults
