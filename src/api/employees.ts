import { faker } from '@faker-js/faker'
import { SortTypes } from '../hooks/useGridApiContext'
export interface Employee {
  fullName: string
  email: string
  jobTitle: string
  dateStarted: Date
  [key: string]: string | Date // TODO: fix this
}

type SortMethodHash = {
  [k in SortTypes]: (a: Employee, b: Employee) => number
}

// TODO:make this object agnostic
export const sortMethods: SortMethodHash = {
  asc: (a: Employee, b: Employee) => a.fullName.localeCompare(b.fullName),
  desc: (a: Employee, b: Employee) => b.fullName.localeCompare(a.fullName),
  dateAsc: (a: Employee, b: Employee) =>
    new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime(),
  dateDesc: (a: Employee, b: Employee) =>
    new Date(b.dateStarted).getTime() - new Date(a.dateStarted).getTime(),
}

export const getEmployees = (): Employee[] => {
  const arr: Employee[] = []

  for (let i = 0; i < 150; i++) {
    arr.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      dateStarted: faker.date.past(),
      jobTitle: faker.company.buzzAdjective(),
    })
  }
  return arr
}
