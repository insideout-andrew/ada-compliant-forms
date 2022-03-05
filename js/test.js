import './main.js'

document.querySelector('#throw-error').addEventListener('click', e => {
  e.preventDefault()
  const emailInput = document.querySelector('ada-input[name="email"]')
  emailInput.setError('Uh oh, that email doesn\'t work for some reason')
})

document.querySelector('#complex-form').addEventListener('submit', e => console.log(e.detail))