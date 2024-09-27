import { ValidatorFn } from "@angular/forms";

export type FieldTypes = 'input' | 'select';

export type BaseControlConfig = {
    fieldType: FieldTypes
    controlName: string;
    label?: string;
    placeholder?: string;
    validators?: ValidatorFn[];
};