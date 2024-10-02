import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { InputFieldConfig } from '../../models';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

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
export class InputComponent {
  /**
   * Configuration passed by consumer
   */
  config = input.required<Partial<InputFieldConfig>>();
  /**
   * The default properties that a user shouldn't have to pass
   */
  defaultConfig: Partial<InputFieldConfig> = {
    inputType: 'text',
  };
  /**
   * Configuration used by component with default config and passed configuration;
   */
  computedConfig = computed<Required<InputFieldConfig>>(
    () => ({ ...this.defaultConfig, ...this.config()} as Required<InputFieldConfig>)
  );
  parentFormGroup = input.required<FormGroup>();
  value = input<string | null>(null);
}
