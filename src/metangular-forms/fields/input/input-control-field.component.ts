import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldModule, InputModule } from '@fico/iris';
import { InputFieldConfig } from '@fico/shared/models/form-builder';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControlField } from '../../abstracts';

/**
 * Input control rendered by Iris Form Builder
 */
@Component({
  selector: 'fico-ifb-input',
  standalone: true,
  imports: [FormFieldModule, InputModule, ReactiveFormsModule],
  template: `
  
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends AbstractControlField<InputFieldConfig, string> {
  override defaultConfig: Partial<InputFieldConfig> = {
    inputType: 'text',
    required: false,
  };
}
