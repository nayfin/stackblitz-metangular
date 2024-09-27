import { Directive, computed, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlValue } from '../models';

@Directive({
  standalone: true,
})
export class AbstractControlField<CT, VT = ControlValue> {
  /**
   * The default properties that a user shouldn't have to pass
   */
  defaultConfig!: Partial<CT>;
  /**
   * Configuration passed by consumer
   */
  config = input.required<Partial<CT>>();
  /**
   * Configuration used by component with default config and passed configuration;
   */
  computedConfig = computed<Required<CT>>(
    () => ({ ...this.defaultConfig, ...this.config()} as Required<CT>)
  );
  parentFormGroup = input.required<FormGroup>();
  value = input<VT | null>(null);
}
