import { AbstractControl } from '@angular/forms';

export function DdlRequiredValidator(control: AbstractControl) {
  if (control.value === null || control.value === '0') {
    return { defaulValue: true };
  }
  return null;
}
