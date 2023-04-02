function generateID(){
  return `_${Math.random().toString(36).substr(2, 9)}`
}

class AdaInput extends HTMLElement {
  constructor(){
    super()
    this.loaded = false
  }

  static get observedAttributes() { 
    return [ 'value' ]
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if(name == 'value'){
      let target = this.querySelector('textarea') || this.querySelector('select') || this.querySelector('input')
      if(target){
        target.value = newValue
      }
    }
  }

  connectedCallback() {
    if(this.loaded){
      return false
    } else {
      this.loaded = true
    }
    
    if(!this.id){
      this.id = generateID()
    }
    
    switch(this.getAttribute('type')){
      case 'checkbox':
      case 'radio':
        this._createCheckboxInputs()
        break
      case 'textarea':
        this._createTextarea()
        break
      case 'select':
        this._createSelect()
        break
      default:
        this._createDefaultInput()
    }

    if(this.hasAttribute('description')){
      this._createDescription()
    }
    
    requestAnimationFrame(() => {
      this.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', e => this._isValid())
        input.addEventListener('input', e => this.dispatchEvent(new CustomEvent('interact', { detail: e.target.value })))
      })
    })
  }

  _createDescription(){
    const p = document.createElement('p')
    p.innerText = this.getAttribute('description')
    p.classList.add('ada-input--description')
    this.append(p)
  }
  
  _createTextarea(){
    const label = document.createElement('label')
    label.innerText = this.getAttribute('label')
    label.setAttribute('for', `${this.id}-input`)
    this.append(label)
    
    const input = document.createElement('textarea')
    input.placeholder = this.getAttribute('placeholder') || ''
    input.value = this.getAttribute('value')    
    input.name = this.getAttribute('name')
    input.id = `${this.id}-input`
    this._addInputProperties(input)
    this.append(input)

    const rules = this.getAttribute('rules')
    if(rules && rules.indexOf('required') != -1){
      input.setAttribute('aria-required', true)
      label.innerHTML = label.innerText + '<span aria-hidden="true">*</span>'
    }
  }
  
  _createCheckboxInputs(){
    //wrap all contents in a fieldset
    const fieldset = document.createElement('fieldset')
    Array.from(this.children).forEach(child => fieldset.append(child))
    this.append(fieldset)
    
    const legend = document.createElement('legend')
    legend.innerHTML = this.getAttribute('label')
    fieldset.prepend(legend)

    const rules = this.getAttribute('rules')
    if(rules && rules.indexOf('required') != -1){
      fieldset.setAttribute('aria-required', true)
      legend.innerHTML = legend.innerText + '<span aria-hidden="true">*</span>'
    }
  }
  
  _createDefaultInput(){
    const label = document.createElement('label')
    label.innerText = this.getAttribute('label')
    label.setAttribute('for', `${this.id}-input`)
    this.append(label)
    
    const input = document.createElement('input')
    input.type = this.getAttribute('type')
    input.name = this.getAttribute('name')
    input.placeholder = this.getAttribute('placeholder') || ''
    input.value = this.getAttribute('value')    
    input.id = `${this.id}-input`
    this._addInputProperties(input)
    this.append(input)

    if(input.type == 'hidden'){    
      label.style.clip = 'rect(0 0 0 0)'
      label.style.clipPath = 'inset(50%)'
      label.style.height = '1px'
      label.style.overflow = 'hidden'
      label.style.position = 'absolute'
      label.style.whiteSpace = 'nowrap'
      label.style.width = '1px'
    }

    const rules = this.getAttribute('rules')
    if(rules && rules.indexOf('required') != -1){
      input.setAttribute('aria-required', true)
      label.innerHTML = label.innerText + '<span aria-hidden="true">*</span>'
    }

    if(input.type == "submit"){
      input.removeAttribute('name')
      input.removeAttribute('placeholder')
      label.remove()
    }        
  }
  
  _createSelect(){
    const label = document.createElement('label')
    label.innerText = this.getAttribute('label')
    label.setAttribute('for', `${this.id}-input`)
    this.append(label)
    
    const input = document.createElement('select')
    input.name = this.getAttribute('name')
    input.id = `${this.id}-input`    
    this._addInputProperties(input)
    this.append(input)    
    setTimeout(() => input.value = this.getAttribute('value'))

    const rules = this.getAttribute('rules')
    if(rules && rules.indexOf('required') != -1){
      input.setAttribute('aria-required', true)
      label.innerHTML = label.innerText + '<span aria-hidden="true">*</span>'
    }    
  }
  
  _addInputProperties(input){
    let attrs = Array.prototype.slice.call(this.attributes)
    if(attrs){
      attrs.forEach(a => {
        if(a.name.indexOf('input-') !== -1){
          var newAttr = a.name.replace('input-', '')
          input.setAttribute(newAttr, a.value)
        }
      })
    }
  }

  _isValid(){    
    const rules = this.getAttribute('rules')
    let isValid = true //prove me wrong once
    let errors = []

    if(this.getAttribute('type') == 'submit'){
      return false
    }

    if(rules){
      rules.split('|').forEach(rule => {
        let target = this.querySelector('textarea') || this.querySelector('select') || this.querySelector('input')
        const value = target.value
        const split = rule.split(':')
        const name = split[0]
        const modifier = split[1]
        switch(name){
          case 'required':
            if(!this._validateRequired(value)){
              errors.push('This field is required')
              isValid = false
            }
            break
          case 'email':
            if(!this._validateEmail(value)){
              errors.push('This field must be a valid email')
              isValid = false
            }
            break
          case 'min':
            if(!this._validateMin(value, modifier)){
              errors.push('This field must be greater or equal to ' + modifier)
              isValid = false
            }
            break
          case 'max':
            if(!this._validateMax(value, modifier)){
              errors.push('This field must be less than or equal to ' + modifier)
              isValid = false
            }
            break
          case 'maxLength':
            if(!this._validateMaxLength(value, modifier)){
              errors.push('This field must be less than or equal to ' + modifier + ' characters')
              isValid = false
            }
            break
          case 'minLength':
            if(!this._validateMinLength(value, modifier)){
              errors.push('This field must be greater than or equal to ' + modifier + ' characters')
              isValid = false
            }
            break
          case 'sameAs':
            if(!this._validateSameAs(value, modifier)){
              const confirmInputLabel = this.closest('form').querySelector(`input[name="${modifier}"]`).parentNode.querySelector('label').innerText.replace('*', '').toLowerCase()
              errors.push(`This field must match the ${confirmInputLabel} input`)
              isValid = false
            }
            break
          case 'mime':
            if(!this._validateMime(value, modifier)){
              errors.push('This field must match the file type: ' + modifier)
              isValid = false
            }
            break
          case 'dateBefore':
            if(!this._validateDateBefore(value, modifier)){
              errors.push('This field must be before or equal to ' + modifier)
              isValid = false
            }
            break
          case 'dateAfter':
            if(!this._validateDateAfter(value, modifier)){
              errors.push('This field must be after or equal to ' + modifier)
              isValid = false
            }
            break
          case 'regex':
            if(!this._validateRegex(value, modifier)){
              errors.push('This field is invalid')
              isValid = false
            }
            break
          case 'url':
            if(!this._validateURL(value, modifier)){
              errors.push('This field is not a valid URL')
              isValid = false
            }
            break
        }
      })
    }

    this._setErrors(errors)
    return isValid
  }
  
  _validateRequired(value){
    const inputType = this.getAttribute('type')
    if(inputType == 'checkbox' || inputType == 'radio'){
      let isValid = false
      this.querySelectorAll(`[name="${this.getAttribute('name')}"]`).forEach(input => {
        if(input.checked || this.selected){
          isValid = true
        }
      })
      return isValid
    } else {
      return value != undefined && value.length
    }
  }
  

  _validateURL(value){
    var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    return (res !== null)
  }

  _validateEmail(value){
    return !value ? true : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
  }
  
  _validateDateBefore(value, checkAgainst){
    var checkDate = new Date(checkAgainst)
    var setDate = new Date(value + ' 00:00:00')
    return !value ? true : checkDate >= setDate
  }
  
  _validateDateAfter(value, checkAgainst){
    var checkDate = new Date(checkAgainst)
    var setDate = new Date(value + ' 00:00:00')
    return !value ? true : checkDate <= setDate
  }

  _validateRegex(value, reg){
    var testvs = new RegExp(reg)
    return !value ? true : testvs.test(value);
  }
  
  _validateMime(value, checkAgainst){
    const file = this.querySelector('input').files[0]
    let isValid = true //prove me wrong
    if(file){
      if(checkAgainst.indexOf('*') != -1){
        isValid = file.type.indexOf(checkAgainst.replaceAll('*', '')) !== -1
      } else {
        isValid = file.type != checkAgainst
      }     
    }
    return isValid
  }
  
  _validateSameAs(value, checkAgainst){
    const targetValue = this.closest('form').querySelector(`input[name="${checkAgainst}"]`).value
    return !value ? true : value == targetValue
  }
  
  _validateMinLength(value, checkAgainst){
    return !value ? true : value.length >= checkAgainst
  }
  
  _validateMaxLength(value, checkAgainst){
    return !value ? true : value.length <= checkAgainst
  }
  
  _validateMin(value, checkAgainst){
    const inputType = this.getAttribute('type')

    if(inputType == 'checkbox'){
      const checkedChildren = this.querySelectorAll('input:checked')
      return !checkedChildren.length ? true : parseFloat(checkAgainst) <= checkedChildren.length
    } else {
      return !value ? true : parseFloat(checkAgainst) <= parseFloat(value)
    }
  }
  
  _validateMax(value, checkAgainst){
    const inputType = this.getAttribute('type')

    if(inputType == 'checkbox'){
      const checkedChildren = this.querySelectorAll('input:checked')
      return !checkedChildren.length ? true : parseFloat(checkAgainst) >= checkedChildren.length
    } else {
      return !value ? true : parseFloat(checkAgainst) >= parseFloat(value)
    }
 }
  
  _setErrors(errors, forceFocus = false){
    const prevErrors = this.querySelectorAll('.ada-input--error') || []
    prevErrors.forEach(err => err.remove())
    
    if(errors.length){
      this.classList.add('error')
      this.classList.remove('valid')
    } else {
      this.classList.remove('error')
      this.classList.add('valid')
    }
    
    if(errors.length){
      const errorContainer = document.createElement('ul')
      errorContainer.id = `${this.id}-errors`
      errorContainer.classList.add('ada-input--error')
      errors.forEach(error => {
        const el = document.createElement('li')
        el.innerText = error
        errorContainer.append(el)
      })
      //maybe this should be `fieldset` for checkboxes and radios?
      const targetInput = this.querySelector('textarea') || this.querySelector('input') || this.querySelector('select')
      targetInput.setAttribute('aria-describedby', `${this.id}-errors`)
      this.append(errorContainer)

      if(forceFocus){
        targetInput.focus()
      }
    } else {
      const targetInput = this.querySelector('textarea') || this.querySelector('input') || this.querySelector('select')
      targetInput.removeAttribute('aria-describedby')
      const errorContainer = this.querySelector(`#${this.id}-errors`)
      if(errorContainer){
        errorContainer.remove()
      }
    }
  }

  setError(error){
    this._setErrors([ error ], true)
  }
}

export { AdaInput }