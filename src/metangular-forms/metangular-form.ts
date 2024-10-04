import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  input,
  effect
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldRendererDirective } from './fields';
import { BaseFormGroupConfig, ControlFieldConfigs, ControlGroupValue } from './models';

@Component({
  selector: 'metangular-form',
  template: `
    <form
      class="crispr-form"
      [formGroup]="form"
      (ngSubmit)="handleSubmit()"
      #ngFormElement="ngForm">
        @for (field of config().fields; track $index) {
          <ng-container fieldRenderer [config]="field" [group]="form">
          </ng-container>
        }
        <div class="d-flex m-2 justify-content-end">
          <button class="btn btn-primary" type="submit">SUBMIT</button>
        </div>
    </form> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FieldRendererDirective,
    ReactiveFormsModule,
  ],
})
export class MetangularFormComponent {
  /**
   * The configuration for the form to be rendered
   */
  config = input.required<BaseFormGroupConfig>();

  /**
   * Optional initial values to populate form
   * Keys of record need match controlName of field to populate
   */
  value = input<ControlGroupValue | undefined>();

  /**
   * An Angular FormGroup to tie form fields to
   */
  form = new FormGroup({});

  /**
   * Emits form value when ngSubmit is triggered
   */
  @Output() formSubmit = new EventEmitter<unknown>();

  /**
   * Emits value of form each time it changes
   */
  @Output() valueChanges: Observable<any> = this.form.valueChanges;
  /**
   * Emits status of form each time it changes
   */
  @Output() statusChanges: Observable<string> = this.form.statusChanges;
   
  constructor() {
    effect(() => {
      buildFormGroupFromConfig(this.config(), this.value(), this.form);
    });
  }
  /**
   * internal handling of submit trigger
   */
  handleSubmit() {
    this.formSubmit.emit(this.form.value);
  }
}


/**
 * builds out form group based on config
 * @param config a configuration for a form group
 * @param value an object of initial values to pass in
 * @param group the form group to modify and build out
 */
export function buildFormGroupFromConfig(
  config: BaseFormGroupConfig,
  value: unknown = null,
  group: FormGroup = new FormGroup({}),
) {
  config.fields.forEach((controlConfig: ControlFieldConfigs) => {
    // Deconstruct the config
    const { controlName, validators } = controlConfig;
    // check if a form control already exists on the form group
    const existingControl = group.get(controlName);
    // If a value was passed for this control then use it otherwise use null
    const controlValue = (value && (value as any)[controlName]) ?? null;
    if (existingControl) {
      existingControl.setValue(controlValue);
      existingControl.setValidators(validators || []);
    } else {
      // Otherwise, default create a control and add it to 
      const control = new FormControl(controlValue || null, validators);
      group.addControl(controlName, control);
    }
  });
}
