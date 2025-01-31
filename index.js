import express from 'express'
import fs from 'fs/promises'
import { engine } from 'express-handlebars'

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './Static/templates')

//test get function with a query paramaters in url
app.get('/', async (request, response) => {
  const buf = await fs.readFile('./index.html')
  const text = buf.toString()
  response.send(text)
})

app.get('/movie', async (request, response) => {
  //const templateBuf = await fs.readFile('./Static/templates/moviePageTemplate.html')
  //const templateText = templateBuf.toString()

  const movieID = request.query.movieId
  const movieData = await fetchMovie(movieID)

  response.render('moviePageTemplate', {
    layout: false,
    title: movieData.attributes.title,
    description: movieData.attributes.intro,
    poster: movieData.attributes.image.url,
    imdb: `https://www.imdb.com/title/${movieData.attributes.imdbId}`,
  })

  /*
  const outputHTML = templateText
    .replace('-#title#-', movieData.attributes.title)
    .replace('-#description#-', movieData.attributes.intro)
    .replace('-#poster#-', movieData.attributes.image.url)
    .replace('-#imdb#-', `https://www.imdb.com/title/${movieData.attributes.imdbId}`)
  console.log(movieData)
  response.send(outputHTML)
  */
})

app.use('/Static', express.static('./Static'))

//app.use('/dist', express.static('./dist'));
//app.use('/Script', express.static('./Script'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(5080)
  console.log('Server started and listening on port 5080')
}

export async function fetchMovie(id) {
  const url = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies/'
  const urlWithParam = url + id
  try {
    const response = await fetch(urlWithParam)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const movieData = await response.json()
    return movieData.data
  } catch (error) {
    console.error(`Error fetching moviedata: ${error.message}`)
  }
}
