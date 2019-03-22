import { ValidatorFn, AbstractControl } from '@angular/forms';
import { RutUtil } from '../../utils/rut.util';

export function RutValidator(control: AbstractControl) {
  if (control.value) {
    const isValid = RutUtil.rutValidate(control.value);
    if (!isValid) {
      return { invalidRut: true };
    }
  }
  return null;
}
