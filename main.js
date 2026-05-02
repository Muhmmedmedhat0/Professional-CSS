const hamburgerButton = document.querySelector('[aria-controls="primary-nav"]');
const nav = document.querySelector('.primary-navigation');

hamburgerButton.addEventListener('click', () => {
  // check if the navigation is opened
  const isNavOpened = hamburgerButton.getAttribute('aria-expanded');

  if (isNavOpened === 'false') {
    hamburgerButton.setAttribute('aria-expanded', 'true');
  } else {
    hamburgerButton.setAttribute('aria-expanded', 'false');
  }
});
