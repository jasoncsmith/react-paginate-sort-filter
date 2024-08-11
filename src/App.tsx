import GridApi from './components/GridApi'
import { getEmployees } from './api/employees'
import { getMusicians } from './api/musicians'

const Header = () => {
  return (
    <header className="p-6 border-b-2 border-solid border-gray-700 text-white flex justify-between items-center">
      Super Sort 5000
    </header>
  )
}

const Main = () => {
  return (
    <main className={'min-w-96 mx-auto p-6 flex gap-4 flex-wrap'}>
      <GridApi
        fields={{
          fullName: 'string',
          email: 'string',
          jobTitle: 'string',
          dateStarted: 'Date',
        }}
        fetcher={getEmployees}
        recordType="Employee"
        defaultRecordsPerPage={5}
        defaultSort="asc"
      />
      <GridApi
        fields={{
          genre: 'string',
          numAlbums: 'number',
          fullName: 'string',
          groupName: 'string',
          yearsActive: 'number',
        }}
        fetcher={getMusicians}
        recordType="Musicians"
        defaultRecordsPerPage={3}
        defaultSort="asc"
      />
    </main>
  )
}

const Footer = () => {
  return <footer></footer>
}

const App = () => {
  return (
    <div className="app max-w-[1024px] mx-auto">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
