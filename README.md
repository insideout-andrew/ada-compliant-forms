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
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)