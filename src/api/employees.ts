import { faker } from '@faker-js/faker'
import { Employee } from '../hooks/useAppContext'

export const getEmployees = () => {
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
