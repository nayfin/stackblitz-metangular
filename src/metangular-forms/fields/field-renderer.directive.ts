import {
  Directive,
  Input,
  ViewContainerRef,
  OnInit,
  inject,
  input,
  ComponentRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  AllFieldConfigs,
  ControlValue,
  FieldType,
} from '../models';

import type {
  InputComponent,
} from './input/input-control-field.component';

export const FIELD_COMPONENTS = {
  input: () =>
    import('./input/input-control-field.component').then(
      ({ InputComponent }) => InputComponent
    ),
  // select: () => import('./select/select-control-field.component').then(({ SelectComponent }) => SelectComponent),
  // subGroup: () =>
  //   import('./sub-group/sub-group-control-field.component').then(({ IfbSubGroupComponent }) => IfbSubGroupComponent),
};


export type ComponentKeys = keyof typeof FIELD_COMPONENTS;

export type FieldComponentType = InputComponent

/**
 * Renders a form field from a field configuration
 */
@Directive({
  selector: '[maFieldRenderer]',
  standalone: true,
})
export class FieldRendererDirective implements OnInit {
  private container: ViewContainerRef = inject(ViewContainerRef);
  /**
   * The config for the form field to render
   */
  @Input({ required: true }) config!: AllFieldConfigs;
  /**
   * The form group to add the control to
   */
  @Input({ required: true }) group!: FormGroup;

  value = input<ControlValue>();

  componentRef!: ComponentRef<FieldComponentType>;

  async ngOnInit() {
    /**
     * create component and passes the field's config and the form group to the inputs
     */
    const component = await FIELD_COMPONENTS[
      this.config.fieldType as FieldType
    ]();
    this.componentRef =
      this.container.createComponent<FieldComponentType>(component);

    this.componentRef.setInput('config', this.config);
    this.componentRef.setInput('parentFormGroup', this.group);
  }
}
