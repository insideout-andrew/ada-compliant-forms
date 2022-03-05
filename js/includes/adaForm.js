class adaForm extends HTMLElement {
  connectedCallback() {
    //wrap all children in a form element
    const form = document.createElement('form')
    Array.from(this.children).forEach(child => form.append(child))
    this.append(form)
    const action = this.getAttribute('action') || ''
    const method = this.getAttribute('method') || ''
    if(action){
      form.setAttribute('action', action)
    }
    if(method){
      form.setAttribute('method', method)
    }

    //listen for a submit
    form.addEventListener('submit', e => {
      e.preventDefault()
      e.stopPropagation()
      
      let formIsValid = true //prove me wrong at least once      
      
      form.querySelectorAll('ada-input').forEach(input => {
        if(input.getAttribute('type') != 'submit' && !input._isValid()){
          formIsValid = false
        }
      })
      
      if(!formIsValid){
        let inputTarget = this.querySelector('ada-input.error input') || this.querySelector('ada-input.error textarea') || this.querySelector('ada-input.error select')
        inputTarget.focus()
      } else {
        const formData = new FormData(this.querySelector('form'))
        let obj = {}
        for (let [key, value] of formData) {
          if(key == null || value == null){
            continue
          }
          
          if (obj[key] !== undefined) {
            if (!Array.isArray(obj[key])) {
              obj[key] = [obj[key]]
            }
            obj[key].push(value)
          } else {
            obj[key] = value
          }
        }
        this.dispatchEvent(new CustomEvent('submit', { detail: obj }))
      }
    })
  }
}

export { adaForm }