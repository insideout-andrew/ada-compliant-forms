# Ada Compliant Forms

Create forms compliant with the American Disabilities Act with no effort at all... seriously it is easier than HTML. All you need to do is include the JS and then start building your forms.

It is fast, simple, lightweight (<20kb), there are absolutely NO CSS associated with is, and will allow you to build robust ADA-compliant forms with live error handling without ever touching a line of Javascript.

## What's available

Supported input types:
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
- date

Supported validation rules:

| Name | Example | Description |
| --- | --- | --- |
| Required | `rules="required"` | Some value must be preset |
| Email | `rules="email"` | Value must match email regex. |
| URL | `rules="url"` | Value must match url regex. |
| Min | `rules="min:3"` | Value must be at least this number |
| Max | `rules="max:3"` | Value cannot be more than this number |
| Min Length | `rules="minLength:3"` | Value length must be at least this number |
| Max Length | `rules="maxLength:3"` | Value length cannot be more than this number |
| Same As | `rules="sameAs:inputName"` | This value must match the set value. This is nice for confirming passwords. |
| Mime | `rules="mime:image/*"` | This file must match this mime type. This only works for file inputs. You can use a * as a wildcard. |
| Date Before | `rules="dateBefore:1970-01-01"` | This value must be less than this date. This only works for date inputs. |
| Date After | `rules="dateAfter:1970-01-01"` | This value must be greater than this date. This only works for date inputs. |
| Regular Expression | `rules="regex:^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"` | This value must match the supplied regex. |

## Usage

Install in your project using npm

```
npm install ada-compliant-forms
```

In your javascript file, simply include the library

```
import 'ada-compliant-forms'
```

## Anatomy

### `<ada-form>`

Use this to wrap all inputs


### `<ada-input>`

Use these within an `<ada-form>` element to create inputs as needed.

| Parameter | Description |
| --- | --- |
| type | Input type |
| name | Input name |
| label | Input label |
| placeholder | Input placeholder |
| rules | Validation rules (if needed). Multiple rules should be separated with a pipe |

### `<ada-option>`

Use these within an `<ada-input type="select|checkbox|radio">` to create options as needed.

| Parameter | Description |
| --- | --- |
| value | Option value |
| label | Option label |

## Examples

```html
<ada-form id="simple-form">
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
</ada-form>



<ada-form id="complex-form">
  <h2>Complex Example Form</h2>
  <ada-input label="Full Name" type="text" name="fullName" rules="required|minLength:2" placeholder="John Smith"></ada-input>
  <ada-input label="Your Email" type="email" name="email" rules="required|email" placeholder="email@mail.com"></ada-input>
  <ada-input label="Choose a number greater than 2 but less than 8" type="number" name="number" rules="required|min:3|max:7" placeholder="5"></ada-input>
  <ada-input label="Choose something" type="select" name="thing" rules="required">
    <ada-option value="" label="--"></ada-option>
    <ada-option value="something" label="Something"></ada-option>
    <ada-option value="something-else" label="Something Else"></ada-option>
    <ada-option value="another-thing" label="Another Thing"></ada-option>
  </ada-input>
  <ada-input label="Choose 2 items" type="checkbox" name="items" rules="required|min:2|max:2">
    <ada-option value="something" label="Something"></ada-option>
    <ada-option value="something-else" label="Something Else"></ada-option>
    <ada-option value="another-thing" label="Another Thing"></ada-option>
  </ada-input>
  <ada-input label="Choose 1 item" type="radio" name="items2" rules="required">
    <ada-option value="something" label="Something"></ada-option>
    <ada-option value="something-else" label="Something Else"></ada-option>
    <ada-option value="another-thing" label="Another Thing"></ada-option>
  </ada-input>
  <ada-input label="Message" type="textarea" name="message" rules="required|minLength:10|maxLength:100" placeholder="Leave me a nice message"></ada-input>
  <ada-input label="Password" type="password" name="password" rules="required|regex:^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})" placeholder="Enter your password"></ada-input>
  <ada-input label="Confirm Password" type="password" name="confirmPassword" rules="required|sameAs:password" placeholder="Confirm your password"></ada-input>
  <ada-input label="Upload an Image" type="file" name="image" rules="required|mime:image/*"></ada-input>
  <ada-input label="Date Before" type="date" name="date before" rules="required|dateBefore:2022-03-7|dateAfter:2022-03-01"></ada-input>
  <ada-input type="submit" value="Submit"></ada-input>
  <button  class="button" id="throw-error">Add Custom Error</button>
</ada-form>



<!-- handle collecting the information... or add method/action to the <ada-form> and let your server handle everything -->
<script>
  document.querySelector('#simple-form').addEventListener('submit', e => alert(`Hello ${e.detail.fullName}`)

  document.querySelector('#complex-form').addEventListener('submit', e => console.log(e.detail))
  
  document.querySelector('#throw-error').addEventListener('click', e => {
    e.preventDefault()
    const emailInput = document.querySelector('ada-input[name="email"]')
    emailInput.setError('Uh oh, that email doesn\'t work for some reason')
  })
</script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)