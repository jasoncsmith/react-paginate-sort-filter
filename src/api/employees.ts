import { faker } from '@faker-js/faker'
import { SortTypes } from '../hooks/useGridApiContext'
export interface Employee {
  name: string
  email: string
  jobTitle: string
  dateStarted: Date
}

type SortMethodHash = {
  [k in SortTypes]: (a: Employee, b: Employee) => number
}

export const sortMethods: SortMethodHash = {
  asc: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
  desc: (a: Employee, b: Employee) => b.name.localeCompare(a.name),
  dateAsc: (a: Employee, b: Employee) =>
    new Date(a.dateStarted).getTime() - new Date(b.dateStarted).getTime(),
  dateDesc: (a: Employee, b: Employee) =>
    new Date(b.dateStarted).getTime() - new Date(a.dateStarted).getTime(),
}

export const getEmployees = (): Employee[] => {
  const arr: Employee[] = []

  for (let i = 0; i < 150; i++) {
    arr.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      dateStarted: faker.date.past(),
      jobTitle: faker.company.buzzAdjective(),
    })
  }
  return arr
}
