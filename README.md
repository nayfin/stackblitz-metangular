<style>
.img-container {
  /* border: solid green 4px; */
  display: flex column;

}

</style>

# MetAngular
Demonstration of how to use metaprogramming to build a form that can be rendered from a configuration at runtime. 

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

<img alt="metaprogramming image" src="./src//assets/metaprogramming.webp" width="300"/>


Pros:
- Enables user configurable UI systems
- Enforces consistent patterns
- Fast downstream development once systems are built
- Very DRY 
- Abstracts away difficult implementation details

Cons:
- Building and maintaining the system is more difficult than traditional development
- API changes can require changes to stored configs (require database migrations)



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

## Code Walkthrough

### Form Component

- Receives form configuration and optional intial values

- Initializes Angular FormGroup and adds a FormControl for each field in the form configuration
- Loops over each field in the `fields` array, passing the field's configuration and the FormGroup to the FieldRenderer Directive 


[embed](https://github.com/nayfin/stackblitz-metangular/blob/14cabe00a2cc9a4663c2285272b8995bbc83268d/src/metangular-forms/metangular-form.ts#L70-L111)

### Field Renderer Directive
- Renders the field component that corresponds to that configuration's `fieldType` property (e.g. renders a select field when the `fieldType` is `select`)
- set the `config` and `parentFormGroup` properties on the rendered component



## Next Steps
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


