import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MetangularFormComponent } from './metangular-forms/metangular-form';
import { BaseFormGroupConfig } from './metangular-forms/models';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MetangularFormComponent, JsonPipe],
  template: `
    <metangular-form
     [config]="formConfig" 
     [value]="initialValue"
     (formSubmit)="handleFormSubmit($event)"
    ></metangular-form>

    <pre>
      Form Value: {{ latestFormValue() | json }}
    </pre>
  `,
})
export class App {
  formConfig: BaseFormGroupConfig = {
    fields: [
        {
          fieldType: 'input', // Render an input element
          inputType: 'text', // Of type 'text'
          controlName: 'firstName', // Bind the element's value to 'fullName' property of the formGroup
          label: 'First Name', // the label to display in the UI
          placeholder: 'Jane', // Placeholder text before a user starts typing
        },
        {
          fieldType: 'input', // Render an input element
          inputType: 'text', // Of type 'text'
          controlName: 'lastName', // Bind the element's value to 'fullName' property of the formGroup
          label: 'last Name', // the label to display in the UI
          placeholder: 'Doe', // Placeholder text before a user starts typing
        },
        {
          fieldType: 'input', // Render an input element
          inputType: 'number', // Of type 'text'
          controlName: 'dogCount', // Bind the element's value to 'fullName' property of the formGroup
          label: 'Number of dogs you have', // the label to display in the UI
          placeholder: '8', // Placeholder text before a user starts typing
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

  latestFormValue = signal<unknown>(null);

  initialValue = {
    firstName: 'Bill',
    lastName: 'Murray',
    dogs: 2,
    favoriteColor: 'red'
  }

  handleFormSubmit(value: unknown) {
    console.log({value})
    this.latestFormValue.set(value)
  }
}

bootstrapApplication(App);
