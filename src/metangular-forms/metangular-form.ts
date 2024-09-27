import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  input,
  effect,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgClass } from '@angular/common';
import { FieldRendererDirective } from './fields';
import { BaseFormGroupConfig, ControlFieldConfigs, ControlGroupValue, ControlValue } from './models';

@Component({
  selector: 'metangular-form',
  template: `
    <form
      class="crispr-form"
      [formGroup]="form()"
      (ngSubmit)="handleSubmit()"
      #ngFormElement="ngForm">
      @if(config().fields.length > 0) {
        @for (field of config().fields; track $index) {
          <ng-container fieldRenderer [value]="field" [config]="field" [group]="form()">
          </ng-container>
        }
        <!-- programmatically clicked when triggerSubmit function called.
        Uses a hidden button with type="submit" because it will trigger both native form submit event
        (which the error handler has to listen for) and ngSubmit event  -->
        <div class="d-flex m-2 justify-content-end">
          <button class="btn btn-primary" #submitTrigger type="submit">SUBMIT</button>
        </div>
      } @else {
        <div class="d-flex w-100 p-2">
          <img class="w-100" src="https://media.tenor.com/1wa_xs8OS1IAAAAM/hungry-seamore.gif">
        </div>
      }
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
  config = input.required<BaseFormGroupConfig>();

  // if no form has been passed in by the consuming component, we create an empty group to build out the form
  form = input<FormGroup>(new FormGroup({}));

  value = input<ControlGroupValue | undefined>();

  @Output() formSubmit = new EventEmitter<unknown>();
  // proxy value and status change events through to consuming component
  @Output() valueChanges: Observable<any> = this.form().valueChanges;
  @Output() statusChanges: Observable<string> = this.form().statusChanges;
  /**
   * This is used to trigger submits via a hidden button in the form, which
   * triggers ngSubmit so that the form's status get's updated
   */
  @ViewChild('submitTrigger') submitTrigger!: ElementRef<HTMLButtonElement>;

  constructor() {
    effect(() => {
      buildFormGroupFromConfig(this.config(), this.value(), this.form());
    });
  }
  /**
   * internal handling of submit trigger
   */
  handleSubmit() {
    // ensure form errors are triggered on submit
    this.form().markAllAsTouched();
    // emit the whole form
    this.formSubmit.emit(this.form().value);
  }
  /**
   * clicks a hidden submit button on the form which triggers the ngSubmit event and updates the form's status
   */
  triggerSubmit() {
    this.submitTrigger.nativeElement.click();
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
    // then add a control to the group using the controlName from configuration
    const { controlName } = controlConfig;
    const existingControl = group.get(controlName);
    const controlValue = (value && (value as any)[controlName]) ?? null;
    if (existingControl) {
      existingControl.setValue(controlValue);
    } else {
      // Otherwise, default to null
      const control = createControlForType(controlConfig, controlValue);
      group.addControl(controlName, control);
    }
    // if there's a value object and it has a non-null/undefined value for this field use it.
  });
  
  return group;
}

/**
 * Analyze the config and build a form control to spec. Notice we don't use FormBuilder here
 * as we want to keep this function pure.
 * @param controlConfig the configuration object for the control to build
 * @param value an initial value to use if passed in
 */
export function createControlForType(controlConfig: ControlFieldConfigs, value: ControlValue = null) {
  // build form control out based on the control type
  const control = new FormControl(value || null);

  return control;
}
