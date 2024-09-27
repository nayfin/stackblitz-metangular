import { BaseControlConfig } from './base-field-config';

export type InputFieldConfig = BaseControlConfig & {
  fieldType: 'input';
  inputType?: InputType;
}

type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
