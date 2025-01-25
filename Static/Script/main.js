//Fetch FrontPage Content

loadFrontPageContent()
addFrontPageContent()

async function loadFrontPageContent() {
  try {
    const contentResponse = await fetch('Static/FrontPage-content.json')
    if (!contentResponse.ok) throw new Error('Failed to load content')
    const frontPageContent = await contentResponse.json()
    console.log(frontPageContent)

    const imagesResponse = await fetch('Static/FrontPage-images.json')
    if (!imagesResponse.ok) throw new Error('Failed to load images')
    const frontPageImages = await imagesResponse.json()
    console.log(frontPageImages)

    //IMAGES
    const imageUrl = frontPageImages.backgroundImage
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${imageUrl})`

    return frontPageContent
  } catch (error) {
    console.error('Error loading front page content:', error)

    const errorMessage = document.createElement('div')
    errorMessage.classList.add('error-message')
    errorMessage.innerHTML = 'Oops! Something went wrong while loading the page. Please try again later.'
    document.body.appendChild(errorMessage)

    document.querySelector('header').style.display = 'none'
    document.querySelector('main').style.display = 'none'
    document.querySelector('footer').style.display = 'none'
  }
}

async function addFrontPageContent() {
  const frontPageContent = await loadFrontPageContent()

  //HEADER
  document.querySelector('.header__logo-title').innerHTML = frontPageContent.header.logoTitle
  const navItems = document.querySelectorAll('.header__nav-item')
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].innerHTML = frontPageContent.header.menu[i]
  }

  //FOOTER
  document.querySelector('.footer__social-title').innerHTML = frontPageContent.footer.socialTitle
  document.querySelector('.footer__contact-title').innerHTML = frontPageContent.footer.contactTitle
  document.querySelector('.footer__contact-info').innerHTML = frontPageContent.footer.contactInfo
  document.querySelector('.footer__contact-number').innerHTML = frontPageContent.footer.contactNumber
  document.querySelector('.footer__contact-mail1').innerHTML = frontPageContent.footer.contactMail1
  document.querySelector('.footer__contact-mail2').innerHTML = frontPageContent.footer.contactMail2
  document.querySelector('.footer__find-Us-title').innerHTML = frontPageContent.footer.findUsTitle
  document.querySelector('.footer__find-Us-streetname').innerHTML = frontPageContent.footer.findUsStreetName
  document.querySelector('.footer__find-Us-postalcode').innerHTML = frontPageContent.footer.findUsPostalCode
  document.querySelector('.footer__find-Us-country').innerHTML = frontPageContent.footer.findUsCountry
  document.querySelector('.footer__partners-title').innerHTML = frontPageContent.footer.partnersTitle
}
