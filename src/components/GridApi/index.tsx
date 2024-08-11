import { ReactNode } from 'react'
import { Employee, GridApiProvider, GridApiProviderProps, SortTypes } from '../../hooks/useGridApiContext'

import { Filter, NumberOfRecordsDisplay, RecordsPerPageSelector, Sort } from './components/Controls'
import Pagination from './components/Pagination'
import Table from './components/Table'

const GridWrap = ({ children }: { children: ReactNode }) => {
  return <div className="w-full p-4">{children}</div>
}

const Controls = ({ children }: { children: ReactNode }) => {
  return <div className="w-full flex justify-between py-4">{children}</div>
}

export interface GridApiProps {
  defaultRecordsPerPage: number
  recordType: string
  fetcher: any //() => Employee[] // TODO: find a way to implement generic
  defaultSort: SortTypes
  fields: object
}

const GridApi = ({ fetcher, recordType, defaultRecordsPerPage, defaultSort, fields }: GridApiProps) => {
  return (
    <GridApiProvider
      fetcher={fetcher}
      recordType={recordType}
      defaultRecordsPerPage={defaultRecordsPerPage}
      defaultSort={defaultSort}
      fields={fields}
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
