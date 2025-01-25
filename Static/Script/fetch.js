fetchAPI()

async function fetchAPI() {
  const url = 'https://plankton-app-xhkom.ondigitalocean.app/api/movies/'
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const movieData = await response.json()
    console.log(movieData)
    return movieData.data
  } catch (error) {
    console.error(error.message)
  }
}
