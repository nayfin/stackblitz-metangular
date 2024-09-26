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
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgClass } from '@angular/common';
import { IfbFieldDirective } from '../field.directive';
import { ControlGroupValue, IfbFormConfig } from '';
import { InitialControlValuePipe, buildFormGroupFromConfig } from '../utils';

@Component({
  selector: 'fico-ifb-form',
  styleUrls: ['form.component.scss'],
  template: `
  <form
    class="crispr-form"
    [ngClass]="config().classes"
    [formGroup]="form()"
    (ngSubmit)="handleSubmit()"
    #ngFormElement="ngForm">
    @for (field of config().fields; track $index) {
      <ng-container ficoIfbField [value]="field | initialControlValue: value()" [config]="field" [group]="form()">
      </ng-container>
    }
    <!-- Hidden button, programmatically clicked when triggerSubmit function called.
      Uses a hidden button with type="submit" because it will trigger both native form submit event
      (which the error handler has to listen for) and ngSubmit event  -->
    <button #submitTrigger type="submit">SUBMIT</button>
  </form> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    IfbFieldDirective,
    InitialControlValuePipe,
    ReactiveFormsModule,
  ],
})
export class MetangularFormComponent {
  config = input.required<IfbFormConfig>();

  // if no form has been passed in by the consuming component, we create an empty group to build out the form
  form = input<FormGroup>(new FormGroup({}));

  value = input<ControlGroupValue | undefined>();

  @Output() submitted = new EventEmitter<unknown>();
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
    this.submitted.emit(this.form().value);
  }
  /**
   * clicks a hidden submit button on the form which triggers the ngSubmit event and updates the form's status
   */
  triggerSubmit() {
    this.submitTrigger.nativeElement.click();
  }
}
