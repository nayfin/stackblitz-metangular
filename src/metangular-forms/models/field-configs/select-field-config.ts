import { BaseControlConfig } from "./base-field-config";

export interface SelectOption {
    /** String used to display text in the option list */
    label: string;
    /** unknown used as the value in the option html */
    value: unknown;
    /** Boolean used to disable the option */
    disabled?: boolean;
  }
  
  
  export type SelectFieldConfig = BaseControlConfig & {
    fieldType: 'select';
    options: SelectOption[];
  }