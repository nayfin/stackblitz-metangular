import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectFieldConfig } from '../../models';

export const defaultSelectFieldConfig: Partial<SelectFieldConfig> = {};

/**
 * Select control rendered by Iris Form Builder
 */
@Component({
  selector: 'metangular-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div [formGroup]="parentFormGroup()" class="m-2"> 
    <label class="form-label">{{computedConfig().label}}</label>
    <select class="form-control" 
      [formControlName]="computedConfig().controlName">
      @if(computedConfig().placeholder; as placeholder) {
        <option selected [value]="null" disabled>{{placeholder}}</option>
      }
      @for (option of computedConfig().options; track $index) {
        <option [value]="option.value">
          {{ option.label }}
        </option>
      }
    </select>
  </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  /**
   * Configuration passed by consumer
   */
  config = input.required<Partial<SelectFieldConfig>>();
  /**
   * The default properties that a user shouldn't have to pass
   */
  defaultConfig!: Partial<SelectFieldConfig>;
  /**
   * Configuration used by component with default config and passed configuration;
   */
  computedConfig = computed<Required<SelectFieldConfig>>(
    () => ({ ...this.defaultConfig, ...this.config()} as Required<SelectFieldConfig>)
  );
  parentFormGroup = input.required<FormGroup>();
}
