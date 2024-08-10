import GridApi from './components/GridApi'
import { getEmployees } from './api/employees'

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
      <GridApi fetcher={getEmployees} recordType="Employee" recordsPerPage={5} defaultSort="asc" />
      <GridApi fetcher={getEmployees} recordType="Narko" recordsPerPage={3} defaultSort="dateAsc" />
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
