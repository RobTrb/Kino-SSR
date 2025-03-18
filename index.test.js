import request from 'supertest'
import { jest } from '@jest/globals'
import app, { fetchMovie } from './index.js'

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

describe('GET /movie', () => {
  it('should return HTML with correct movie title', async () => {
    global.fetch = jest.fn()

    const mockMovie = {
      data: {
        id: 111,
        attributes: {
          title: 'Testmovie',
          intro: 'An amazing movie about testing',
          image: { url: 'https://notrelevant.com/Testmovie.jpg' },
          imdbId: 'faketitle',
        },
      },
      meta: {},
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovie,
    })

    const response = await request(app).get('/movie?movieId=111')

    expect(response.status).toBe(200)
    expect(response.text).toContain('<h1 class="title">Testmovie</h1>')

    fetch.mockRestore()
  })
})
