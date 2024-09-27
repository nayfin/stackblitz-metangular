import type { InputFieldConfig, SelectFieldConfig } from './field-configs';

export interface BaseFormGroupConfig {
  fields: ControlFieldConfigs[];
}

/**
 * Union of configs for form control fields
 */
export type ControlFieldConfigs =
  | InputFieldConfig
  | SelectFieldConfig
/**
 * Union of all field configs
 */

export type ControlValue<T = unknown> = null | boolean | string | number | Date | T;

export type ControlGroupValue = { [key: string]: ControlValue };
