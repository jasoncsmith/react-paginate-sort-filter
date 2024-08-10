import { useGridApiContext } from '../../hooks/useAppContext'
import NoResults from '../NoResults'

const Table = () => {
  const { recordsToRender } = useGridApiContext()

  if (recordsToRender.length === 0) {
    return <NoResults />
  }

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
        {recordsToRender.map((r, idx) => (
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

export default Table
