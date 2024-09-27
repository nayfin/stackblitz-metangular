import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControlField } from '../abstract-control-field';
import { SelectFieldConfig } from '../../models';

export const defaultSelectFieldConfig: Partial<SelectFieldConfig> = {};

/**
 * Select control rendered by Iris Form Builder
 */
@Component({
  selector: 'fico-ifb-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <div [formGroup]="parentFormGroup()" class="m-2"> 
    <label class="form-label">{{computedConfig().label}}</label>
    <select class="form-control" 
      [formControlName]="computedConfig().controlName">
      @if(computedConfig().placeholder; as placeholder) {
        <option selected [value]="null" >{{placeholder}}</option>
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
export class SelectComponent extends AbstractControlField<
  SelectFieldConfig,
  unknown[]
> {
  override defaultConfig: Partial<SelectFieldConfig> = defaultSelectFieldConfig;
}
