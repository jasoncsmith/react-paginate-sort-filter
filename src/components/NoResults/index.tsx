import { ACTION_TYPES, useGridApiContext } from '../../hooks/useAppContext'

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

export default NoResults
