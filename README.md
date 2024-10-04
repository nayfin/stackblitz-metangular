<style>
.img-container {
  /* border: solid green 4px; */
  display: flex column;

}

</style>

# MetAngular

## Getting Started

### GitHub Repository
<div class="img-container">
  <img alt="qr code for https://github.com/nayfin/stackblitz-metangular" src="./src//assets/github-qr.png" width="600"/>
  <h3>
  www.github.com/nayfin/stackblitz-metangular
  </h3>
</div>

### Stackblitz Example
<div class="img-container">

  <img alt="qr code for https://stackblitz.com/~/github.com/nayfin/stackblitz-metangular" src="./src//assets/stackblitz-qr.png" width="600"/>
  <h3>
  www.stackblitz.com/~/github.com/nayfin/stackblitz-metangular
  </h3>
</div>

## Metaprogramming


>  It means that a program can be designed to read, generate, analyse, or transform other programs, and even modify itself, while running. 
>
> -- <cite>Wikipedia (Metaprogramming)</cite>

Useful for:
- Highly dynamic UI components
- User configurable UI systems
- Codifying highly reused structures
- Enforcing guardrails

Here well demonstrate how to use metaprogramming to build a form that can be rendered from a configuration at runtime. 

## API First
Start by designing the API you'd like to use if you were consuming the component. For a form that asks a user for their full name and favorite color we'd need two form fields and their configuration might look something like this.
```ts
const formConfig: BaseFormGroupConfig = {
  // Our list of form fields to display. There are many different fields we'll need to create but lets start two fields: `input` and `select`.
  fields: [
    {
      fieldType: 'input', // Render an input element
      inputType: 'text', // Of type 'text'
      controlName: 'fullName', // Bind the element's value to 'fullName' property of the formGroup
      label: 'Full Name', // the label to display in the UI
      placeholder: 'Jane Doe', // Placeholder text before a user starts typing
      validators: [Validators.required]
    },
    {
      fieldType: 'select', // Render a select element
      controlName: 'favoriteColor', // Bind the elements value to 'favoriteColor' property of the formGroup
      label: 'Favorite Color', // the label to display in the UI
      placeholder: 'Select Color', // Placeholder text before a user makes selection
      options: [ // the available options
        {
          label: 'Purple',
          value: 'purple',
        },
        {
          label: 'Red',
          value: 'red',
        },
        {
          label: 'Blue',
          value: 'blue',
        }
      ]
    }
  ]
};
```



# Next Steps
- Handling validation messages
	- Add [ngneat-error-tailor](https://github.com/ngneat/error-tailor) or follow [this guide](https://netbasal.com/make-your-angular-forms-error-messages-magically-appear-1e32350b7fa5) to create a custom implementation
- Begin abstracting shared logic into base class
- Add more fields
	- textarea
	- autocomplete
	- form arrays
	- sub groups

# Recources

- Learned about this dynamic forms from an article from Netanel Basal,
- [Automatic Form Validation ]


