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
  ControlFieldConfigs,
} from '../models';

import type { InputComponent } from './input/input-control-field.component';
import type { SelectComponent } from './select/select-control-field.component';

/**
 * Record of the form field components to render
 */
export const FIELD_COMPONENTS = {
  input: () => import('./input/input-control-field.component').then(({ InputComponent }) => InputComponent),
  select: () => import('./select/select-control-field.component').then(({ SelectComponent }) => SelectComponent),
};


export type ComponentKeys = keyof typeof FIELD_COMPONENTS;

export type FieldComponentType = InputComponent | SelectComponent

/**
 * Renders a form field from a field configuration
 */
@Directive({
  selector: '[fieldRenderer]',
  standalone: true,
})
export class FieldRendererDirective implements OnInit {

  /**
   * The config for the form field to render
   */
  @Input({ required: true }) config!: ControlFieldConfigs;
  /**
   * The form group to add the control to
   */
  @Input({ required: true }) group!: FormGroup;
  /**
   * Used to render the appropriate component   
   */
  private container: ViewContainerRef = inject(ViewContainerRef);
  /**
   * the ComponentRef of the field being rendered
   */
  componentRef!: ComponentRef<FieldComponentType>;

  async ngOnInit() {
    /**
     * create component and passes the field's config and the form group to the inputs
     */
    const component = await FIELD_COMPONENTS[this.config.fieldType]();

    this.componentRef =
      this.container.createComponent<FieldComponentType>(component);

    this.componentRef.setInput('config', this.config);
    this.componentRef.setInput('parentFormGroup', this.group);
  }
}
