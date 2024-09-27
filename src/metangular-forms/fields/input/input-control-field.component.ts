import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputFieldConfig } from '../../models';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControlField } from '../abstract-control-field';

/**
 * Input control rendered by Iris Form Builder
 */
@Component({
  selector: 'metangular-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div
      class="m-2"
      [formGroup]="parentFormGroup()">
      <label class="form-label">{{computedConfig().label}} </label>
      <input
        [type]="computedConfig().inputType"
        [formControlName]="computedConfig().controlName"
        [placeholder]="computedConfig().placeholder"
        class="form-control"
      />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends AbstractControlField<InputFieldConfig, string> {
  override defaultConfig: Partial<InputFieldConfig> = {
    inputType: 'text',
  };
}
