document.getElementById('header__children-movies').addEventListener('click', function () {
  const body = document.body
  // ballooons background
  body.style.backgroundImage = 'url("/assets/images/backgrounds/balloons.png")'
})

document.getElementById('header__menu').addEventListener('click', function () {
  const body = document.body
  window.location.href = '/index.html'
  // Set background back to main
  body.style.backgroundImage = 'url("/assets/images/backgrounds/background_main.webp")'
})
