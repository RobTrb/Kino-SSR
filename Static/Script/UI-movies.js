createMovies()

async function createMovies() {
  try {
    const movies = await fetchAPI()
    console.log('Movies:', movies) //Test if movies get logged, and it gets logged as an array

    if (!Array.isArray(movies)) {
      throw new Error('Fetched data is not an array')
    }

    if (!movies || movies.length === 0) {
      throw new Error('No movies found.')
    }

    const movieContainer = document.querySelector('.movie__wrapper')

    for (let i = 0; i < movies.length; i++) {
      const movieData = movies[i]
      console.log('MOVIEDATA', movieData)

      const movieDOM = document.createElement('div')
      movieDOM.classList.add('movie')
      movieDOM.setAttribute('id', movieData.id)
      movieContainer.appendChild(movieDOM)

      /*
      const movieAgeLimit = document.createElement('span')
      movieAgeLimit.classList.add('movie__age-limit')
      movieAgeLimit.innerHTML = movieData.ageLimit
      movieDOM.appendChild(movieAgeLimit)
      */

      const moviePoster = document.createElement('img')
      moviePoster.classList.add('movie__poster')
      const moviePosterURL = movieData.attributes.image.url
      moviePoster.setAttribute('src', moviePosterURL)
      movieDOM.appendChild(moviePoster)

      const movieTitle = document.createElement('h3')
      movieTitle.classList.add('movie__title')
      movieTitle.innerHTML = movieData.attributes.title
      movieDOM.appendChild(movieTitle)

      /*
      const movieGenres = document.createElement('span')
      movieGenres.classList.add('movie__genres')
      movieGenres.innerHTML = movieData.genres.join(' / ')
      movieDOM.appendChild(movieGenres)
      */

      //Listener when clicking on a movie
      movieDOM.addEventListener('click', () => {
        console.log('Clicked movie:', movieData.attributes.title, movieData.id)
        window.location.href = `movie?movieId=${movieData.id}`
        //window.location.href = `templates/moviePageTemplate.html?movieId=${movieData.id}`;
      })
    }
  } catch (error) {
    console.error('Error fetching or displaying movies:', error)
    const movieContainer = document.querySelector('.movie__wrapper')
    const errorMessage = document.createElement('div')
    errorMessage.classList.add('error-message')
    const frontPageContent = await loadFrontPageContent()
    errorMessage.innerHTML = frontPageContent.error.loadMovies
    movieContainer.appendChild(errorMessage)
  }
}
