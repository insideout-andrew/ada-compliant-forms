# Ada Compliant Forms

Create forms compliant with ADA super fast and easily... seriously it is easier than vanilla HTML. All you need to do is include the JS and then start building your forms.

It is fast, simple, lightweight (<20kb), there is absolutely no css requirements and you never need to touch any Javascript.

## Live Demo

[View Demo Here](https://codepen.io/vickera/pen/qBMeOVe)

## What's available

Supported input types (you can still use other input types but they may not work as intended):
- text
- email
- url
- number
- select
- checkbox
- radio
- textarea
- password
- file
- color
- range
- date

Supported validation rules:

| Name | Example | Description |
| --- | --- | --- |
| Required | `rules="required"` | Some value must be preset |
| Email | `rules="email"` | Value must match email regex |
| URL | `rules="url"` | Value must match url regex |
| Min | `rules="min:3"` | Value must be at least this number |
| Max | `rules="max:3"` | Value cannot be more than this number |
| Min Length | `rules="minLength:3"` | Value length must be at least this number |
| Max Length | `rules="maxLength:3"` | Value length cannot be more than this number |
| Same As | `rules="sameAs:inputName"` | This value must match the set value. This is nice for confirming passwords |
| Mime | `rules="mime:image/*"` | This file must match this mime type. This only works for file inputs. You can use a * as a wildcard |
| Date Before | `rules="dateBefore:1970-01-01"` | This value must be less than this date. This only works for date inputs |
| Date After | `rules="dateAfter:1970-01-01"` | This value must be greater than this date. This only works for date inputs |
| Regular Expression | `rules="regex:^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"` | This value must match the supplied regex |

## Usage

Install in your project using npm

```
npm install ada-compliant-forms
```

In your javascript file, simply include the library and define the custom elements

```
import {
  AdaForm,
  AdaInput,
  AdaOption
} from 'ada-compliant-forms'

customElements.define('ada-form', AdaForm, { extends: 'form' })
customElements.define('ada-input', AdaInput)
customElements.define('ada-option', AdaOption)
```

That is it, you are done with Javascript.

## Anatomy

### `<form is="ada-form" id="simple-form">...</form>`

Use this to wrap all inputs


### `<ada-input ...></ada-input>`

Use these within an `<ada-form>` element to create inputs as needed.

| Parameter | Description |
| --- | --- |
| type | Input type |
| name | Input name |
| description | Descriptive text to help understand the field |
| label | Input label |
| placeholder | Input placeholder |
| rules | Validation rules (if needed). Multiple rules should be separated with a pipe |
| input-* | You can use this for adding extra attributes to the index as needed |

### `<ada-option>`

Use these within an `<ada-input type="select|checkbox|radio">` to create options as needed.

| Parameter | Description |
| --- | --- |
| value | Option value |
| label | Option label |

## Examples

```html
<form is="ada-form" id="simple-form">
  <h2>Simple Example Form</h2>
  <ada-input 
    label="Full Name" 
    description="Please enter your full name"
    type="text" 
    name="fullName" 
    rules="required|minLength:4" 
    placeholder="John Smith"
  ></ada-input>
  <ada-input type="submit" value="Submit"></ada-input>
</form>


<form is="ada-form" id="complex-form">
  <h2>Complex Example Form</h2>
  <ada-input
    label="Full Name"
    type="text"
    name="fullName"
    rules="required|minLength:2"
    placeholder="John Smith"
    description="Please enter your full name"
  ></ada-input>
  <ada-input
    label="Your Email"
    type="email"
    name="email"
    rules="required|email"
    placeholder="email@mail.com"
  ></ada-input>
  <ada-input
    label="Website"
    type="url"
    name="url"
    rules="required|url"
    placeholder="https://google.com"
  ></ada-input>
  <ada-input
    label="Choose a number greater than 2 but less than 8"
    type="number"
    name="number"
    rules="required|min:3|max:7"
    placeholder="5"
  ></ada-input>
  <ada-input
    label="Choose something"
    type="select"
    name="thing"
    rules="required"
  >
    <ada-option value="" label="-"></ada-option>
    <ada-option value="something" label="Something"></ada-option>
    <ada-option value="something-else" label="Something Else"></ada-option>
    <ada-option value="another-thing" label="Another Thing"></ada-option>
  </ada-input>
  <ada-input
    label="Choose 2 items"
    type="checkbox"
    name="items"
    rules="required|min:2|max:2"
    description="Please choose exactly 2 items"
  >
    <ada-option value="something" label="Something"></ada-option>
    <ada-option value="something-else" label="Something Else"></ada-option>
    <ada-option value="another-thing" label="Another Thing"></ada-option>
  </ada-input>
  <ada-input
    label="Choose 1 item"
    type="radio"
    name="items2"
    rules="required"
  >
    <ada-option value="something" label="Something"></ada-option>
    <ada-option value="something-else" label="Something Else"></ada-option>
    <ada-option value="another-thing" label="Another Thing"></ada-option>
  </ada-input>
  <ada-input
    label="Message"
    type="textarea"
    name="message"
    rules="required|minLength:10|maxLength:100"
    placeholder="Leave me a nice message"
  ></ada-input>
  <ada-input
    label="Password"
    description="Your password must contain one uppercase letter, one lowercase letter, one number, one symbol, and be more than 8 characters long"
    type="password"
    name="password"
    rules="required|regex:^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
    placeholder="Enter your password"
  ></ada-input>
  <ada-input
    label="Confirm Password"
    type="password"
    name="confirmPassword"
    rules="required|sameAs:password"
    placeholder="Confirm your password"
  ></ada-input>
  <ada-input
    label="Upload an Image"
    type="file"
    name="image"
    rules="required|mime:image/*"
  ></ada-input>
  <ada-input
    label="Date Before"
    type="date"
    name="date before"
    rules="required|dateBefore:2022-03-7|dateAfter:2032-03-01"
    description="Please enter a date between March 1, 2022 and March, 7, 2022"
  ></ada-input>
  <ada-input
    label="Color"
    type="color"
    name="color"
    rules="required"
  ></ada-input>
  <ada-input
    label="Range"
    type="range"
    name="range"
    rules="required"
    input-min="10"
    input-max="20"
    value="15"
  ></ada-input>
  <ada-input type="submit" value="Submit"></ada-input>
  <button class="button" id="throw-error">Add Custom Error</button>
</form>


<script>
  //do something custom when the form is valid and submitted
  const form = document.querySelector('#complex-form')
  
  form.addEventListener('submit', e => {
    e.preventDefault()
    if(form.isValidated){
      console.log(form.toJSON())
    } else {
      console.log('Form not valid')
    }
  })
  
  //set a custom error
  document.querySelector('#throw-error').addEventListener('click', e => {
    e.preventDefault()
    // do some API work
    const emailInput = document.querySelector('ada-input[name="email"]')
    emailInput.setError("Uh oh, that email doesn't work for some reason")
  })
</script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Development
Run `http-server ./` to view the test page

Run `npm run dev` to watch for chanages while working

Run `npm run prod` to minify for production

Run `np` to publish to npm

## License
[MIT](https://choosealicense.com/licenses/mit/)