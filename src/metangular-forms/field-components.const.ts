import type {
  InputComponent,
} from './fields';

export const FIELD_COMPONENTS = {
  input: () => import('./fields/input/input-control-field.component').then(({ InputComponent }) => InputComponent),
  select: () => import('./fields/select/select-control-field.component').then(({ SelectComponent }) => SelectComponent),
};



export type ComponentKeys = keyof typeof FIELD_COMPONENTS;

export type ControlComponentType =
  | InputComponent
