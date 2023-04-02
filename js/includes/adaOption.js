function generateID(){
  return `_${Math.random().toString(36).substr(2, 9)}`
}

class AdaOption extends HTMLElement {
  constructor(){
    super()
    this.loaded = false
  }

  static get observedAttributes() { 
    return [ 'checked' ]
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if(name == 'checked'){
      let target = this.querySelector('input')
      if(target){
        if(newValue == 'true'){
          target.setAttribute('checked', true)
        } else {
          target.removeAttribute('checked')
        }
      }
    }
  }

  connectedCallback() {
    if(this.loaded){
      return false
    } else {
      this.loaded = true
    }
    
    if(this.parentNode.getAttribute('type') == 'select'){
      const id = generateID()      
      const select = this.parentNode.querySelector('select')
      const option = document.createElement('option')
      option.value = this.getAttribute('value')
      option.textContent = this.getAttribute('label')
      select.append(option)
      this.remove()
    } else {
      const id = generateID()
      const input = document.createElement('input')
      input.id = id
      input.type = this.parentNode.parentNode.getAttribute('type')
      input.name = this.parentNode.parentNode.getAttribute('name')
      input.value = this.getAttribute('value')
      this.append(input)

      if(this.getAttribute('checked') == 'true'){
        input.setAttribute('checked', true)
      }

      const label = document.createElement('label')
      label.innerHTML = this.getAttribute('label')
      label.setAttribute('for', id)
      this.append(label)

      input.addEventListener('change', e => {
        this.dispatchEvent(new CustomEvent('interact', { detail: input.checked }))
      })
    }
  }
}

export { AdaOption }