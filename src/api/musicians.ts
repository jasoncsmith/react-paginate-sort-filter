import { faker } from '@faker-js/faker'

export interface Musician {
  genre: string
  numAlbums: number
  fullName: string
  groupName: string
  yearsActive: number
}

export const getMusicians = (count = 150) => {
  const arr: Musician[] = []

  for (let i = 0; i < count; i++) {
    arr.push({
      fullName: faker.person.fullName(),
      genre: faker.music.genre(),
      groupName: faker.music.songName(),
      yearsActive: faker.number.int({ min: 1, max: 38 }),
      numAlbums: faker.number.int({ min: 1, max: 99 }),
    })
  }

  return arr
}
