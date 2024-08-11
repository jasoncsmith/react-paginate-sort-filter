import { useGridApiContext } from '../../../../hooks/useGridApiContext'
import NoResults from '../NoResults'

const Table = () => {
  const { recordsToRender, fields } = useGridApiContext()

  if (recordsToRender.length === 0) {
    return <NoResults />
  }

  return (
    <table className={'w-full min-w-96 text-left'}>
      <thead>
        <tr>
          {Object.keys(fields).map((fieldName, idx) => (
            <th key={idx} className="bg-gray-50 p-4 uppercase">
              {fieldName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recordsToRender.map((r, idx) => (
          <tr key={idx}>
            {Object.keys(fields).map((fieldName, idx) => (
              // TODO: define a val renderrer
              <td key={idx} className="border-t-2 border-solid border-white p-4">
                {typeof r[fieldName] === 'string' || typeof r[fieldName] === 'number'
                  ? r[fieldName]
                  : r[fieldName]?.toLocaleDateString()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
