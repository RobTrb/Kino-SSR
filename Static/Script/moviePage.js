const params = new URLSearchParams(window.location.search)
const movieID = params.get('movieId')

console.log('Movie id on template page:', movieID)
