import { ReactNode } from 'react'
import { Employee, GridApiProvider, SortTypes } from '../../hooks/useAppContext'

import { Filter, NumberOfRecordsDisplay, RecordsPerPageSelector, Sort } from '../Controls'
import Pagination from '../Pagination'
import Table from '../Table'

const GridWrap = ({ children }: { children: ReactNode }) => {
  return <div className="w-full p-4">{children}</div>
}

const Controls = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex justify-between py-4">{children}</div>
}

interface GridApiProps {
  fetcher: () => Employee[]
  recordType: string
  recordsPerPage: number
  defaultSort: SortTypes
}

const GridApi = ({ fetcher, recordType, recordsPerPage, defaultSort }: GridApiProps) => {
  return (
    <GridApiProvider
      fetcher={fetcher}
      type={recordType}
      defaultRecordsPerPage={recordsPerPage}
      defaultSort={defaultSort}
    >
      <GridWrap>
        <Controls>
          <Filter />
          <RecordsPerPageSelector />
          <Sort />
        </Controls>
        <Table />
        <NumberOfRecordsDisplay />
        <Pagination />
      </GridWrap>
    </GridApiProvider>
  )
}

export default GridApi
