import {
  AdaForm,
  AdaInput,
  AdaOption
} from './main.js'

customElements.define('ada-form', AdaForm, { extends: 'form' })
customElements.define('ada-input', AdaInput)
customElements.define('ada-option', AdaOption)