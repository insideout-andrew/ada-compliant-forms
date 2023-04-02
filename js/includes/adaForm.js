class AdaForm extends HTMLFormElement {
  constructor() {
    super();
    this.isValidated = null
  }

  connectedCallback() {
    this.addEventListener('submit', this.submit)
  }

  disconnectedCallback(){
    this.removeEventListener('submit', this.submit)
  }

  // Override the submit method to add custom behavior
  submit(e) {
    this.isValidated = true //prove me wrong at least once      
  
    this.querySelectorAll('ada-input').forEach(input => {
      if(input.getAttribute('type') != 'submit' && !input._isValid()){
        this.isValidated = false
      }
    })
    
    if(!this.isValidated){
      let inputTarget = this.querySelector('ada-input.error input') || this.querySelector('ada-input.error textarea') || this.querySelector('ada-input.error select')
      inputTarget.focus()
      if("preventDefault" in e){
        e.preventDefault()
        e.stopPropagation() 
      }      
    }
  }

  toJSON(){
    const formData = new FormData(this)
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
    return obj
  }
}

export { AdaForm }