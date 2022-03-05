# Ada Compliant Forms

Create forms compliant with the American Disabilities Act with no effort at all... seriously it is easier than HTML. All you need to do is include the JS and then start building your forms.

## What's available

Supported input types:
- text
- email
- number
- select
- checkbox
- radio
- textarea
- password
- file
- date

Supported validation rules

| Name | Example | Description |
| --- | --- | --- |
| Required | `rules="required"` | Some value must be preset |
| Email | `rules="email"` | Value must match email regex. Note: you should still use stronger server side validation |
| Min | `rules="min:3"` | Value must be at least this number |
| Max | `rules="max:3"` | Value cannot be more than this number |
| Min Length | `rules="minLength:3"` | Value length must be at least this number |
| Max Length | `rules="maxLength:3"` | Value length cannot be more than this number |
| Same As | `rules="sameAs:inputName"` | This value must match the set value. This is nice for confirming passwords. |
| Mime | `rules="mime:image/*"` | This file must match this mime type. This only works for file inputs. You can use a * as a wildcard. |
| Date Before | `rules="dateBefore:1970-01-01"` | This value must be less than this date. This only works for date inputs. |
| Date After | `rules="dateAfter:1970-01-01"` | This value must be greater than this date. This only works for date inputs. |
| Regular Expression | `rules="regex:^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"` | This value must match the supplied regex. |

## Examples

```html
<!-- build a form -->
<ada-form id="simple-form">
  <ada-input 
    label="Full Name" 
    type="text" 
    name="fullName" 
    rules="required" 
    placeholder="John Smith"
  ></ada-input>
  <ada-input type="submit" value="Submit"></ada-input>
</ada-form>

<!-- handle collecting the information... or add method/action to the form and let your server handle everything -->
<script>
  document.querySelector('#simple-form').addEventListener('submit', e => alert(`Hello ${e.detail.fullName}`)
</script>


<ada-form id="complex-form">
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
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)