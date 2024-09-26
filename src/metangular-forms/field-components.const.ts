import type {
  IfbInputComponent,
  IfbSelectComponent,
  IfbTextareaComponent,
  IfbSubGroupComponent,
  IfbCheckboxComponent,
  IfbButtonComponent,
} from './fields';

export const FIELD_COMPONENTS = {
  input: () => import('./fields/input/input.component').then(({ IfbInputComponent }) => IfbInputComponent),
  select: () => import('./fields/select/select.component').then(({ IfbSelectComponent }) => IfbSelectComponent),
  checkbox: () =>
    import('./fields/checkbox/checkbox.component').then(({ IfbCheckboxComponent }) => IfbCheckboxComponent),
  textarea: () =>
    import('./fields/textarea/textarea.component').then(({ IfbTextareaComponent }) => IfbTextareaComponent),
  subGroup: () =>
    import('./fields/sub-group/sub-group.component').then(({ IfbSubGroupComponent }) => IfbSubGroupComponent),
  button: () => import('./fields/button/button.component').then(({ IfbButtonComponent }) => IfbButtonComponent),
};


export type IfbControlOrButton = IfbControlComponentType | IfbButtonComponent;

export type ComponentKeys = keyof typeof FIELD_COMPONENTS;

export type IfbControlComponentType =
  | IfbInputComponent
  | IfbCheckboxComponent
  | IfbSelectComponent
  | IfbTextareaComponent
  | IfbSubGroupComponent;

export type IfbFieldComponentType = IfbControlOrButton;