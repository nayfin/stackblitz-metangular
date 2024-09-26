import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { FormFieldModule, SelectModule } from '@fico/iris';
import { SelectFieldConfig } from '@fico/shared/models/form-builder';
import { ReactiveFormsModule } from '@angular/forms';
import { ParseConfigOptionsPipe } from '../../utils';
import { AbstractControlField } from '../abstract-control-field';

export const defaultSelectFieldConfig: Partial<SelectFieldConfig> = {
  required: false,
  orientation: 'block',
};

/**
 * Select control rendered by Iris Form Builder
 */
@Component({
  selector: 'fico-ifb-select',
  standalone: true,
  imports: [
    FormFieldModule,
    ReactiveFormsModule,
    SelectModule,
    ParseConfigOptionsPipe,
    AsyncPipe,
  ],
  templateUrl: './select.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends AbstractControlField<
  SelectFieldConfig,
  unknown[]
> {
  override defaultConfig: Partial<SelectFieldConfig> = {
    fieldType: 'select',
    required: false,
    orientation: 'block',
  };
}
