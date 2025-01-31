import { fetchMovie } from './index'

describe('Checks if fetchMovie function fecthes correct title', () => {
  const testCases = [
    { id: 8, expectedTitle: 'Pulp Fiction' },
    { id: 9, expectedTitle: 'Fire Walk With Me' },
    { id: 10, expectedTitle: 'Training Day' },
  ]

  testCases.forEach(({ id, expectedTitle }) => {
    test(`should return ${expectedTitle}`, async () => {
      const movie = await fetchMovie(id)

      expect(movie.attributes.title).toBe(expectedTitle)
    })
  })
})
