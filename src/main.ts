import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MetangularFormComponent } from './metangular-forms/metangular-form';
import { BaseFormGroupConfig } from './metangular-forms/models';
import { JsonPipe } from '@angular/common';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MetangularFormComponent, JsonPipe],
  template: `
    <metangular-form
     [config]="formConfig" 
     (formSubmit)="handleFormSubmit($event)"
     (statusChanges)="handleStatusChanges($event)"
    />

    <pre>
      Submitted Form Value: {{ latestFormValue() | json }}
      Status: {{currentStatus() }}
    </pre>
  `,
})
export class App {
  formConfig: BaseFormGroupConfig = {
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

  latestFormValue = signal<unknown>(null);
  currentStatus = signal<string>('')

  /**
   * Used to demonstrating populating with initial values
   */
  initialValue = {
    firstName: 'Rick',
    lastName: 'Moranis',
    dogs: 2,
    favoriteColor: 'red'
  }

  handleFormSubmit(value: unknown) {
    this.latestFormValue.set(value)
  }

  handleStatusChanges(status: string) {
    this.currentStatus.set(status);
  }
}

bootstrapApplication(App);


// {
//   fieldType: 'input', // Render an input element
//   inputType: 'text', // Of type 'text'
//   controlName: 'firstName', // Bind the element's value to 'fullName' property of the formGroup
//   label: 'First Name', // the label to display in the UI
//   placeholder: 'Jane', // Placeholder text before a user starts typing
// },
// {
//   fieldType: 'input', // Render an input element
//   inputType: 'text', // Of type 'text'
//   controlName: 'lastName', // Bind the element's value to 'fullName' property of the formGroup
//   label: 'Last Name', // the label to display in the UI
//   placeholder: 'Doe', // Placeholder text before a user starts typing
// },
// validators: [Validators.required]
