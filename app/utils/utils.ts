import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RutModel } from '../models/rut.model';

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
  return (value !== undefined && value !== null) ? `${value}` : '';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function isInteger(value: any): value is number {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function isFechaValida(fecha: string): boolean {
  const regexp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  return regexp.test(fecha);
}

export function dateStringToISO8601(date: string): string {
  if (isFechaValida(date)) {
    const dateParts = date.split('/');
    const year = Number(dateParts[2]);
    const month = Number(dateParts[1]);
    const day = Number(dateParts[0]);
    return toStringISO8601(year, month, day);
  }
  return null;
}

export function toStringISO8601(year: number, month: number, day: number): string {
  const dateISO8601 = `${year}-${padNumber(month)}-${padNumber(day)}`;
  return dateISO8601;
}

export function validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormArray) {
      for (const ctrl of control.controls) {
        validateAllFormFields(<FormGroup>ctrl);
      }
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    }
  });
}

export function parseToRutModel(rut: string): RutModel {
  const rutsinFormato = quitarTodoFormatoRut(rut);
  if (rutsinFormato) {
    const length = rutsinFormato.length;
    const rutNro = rutsinFormato.substring(0, length - 1);
    const rutDv = rutsinFormato.substring(length - 1);

    const rutModel: RutModel = {};
    rutModel.numero = Number(rutNro);
    rutModel.dv = rutDv;

    return rutModel;
  }
  return null;
}

export function quitarFormatoRut(rut: string) {
  if (rut) {
    const punto = /\./gi;
    return rut.replace(punto, '');
  }
  return null;
}

export function quitarTodoFormatoRut(rut: string) {
  const rutSinPuntos = quitarFormatoRut(rut);
  if (rutSinPuntos) {
    return rutSinPuntos.replace('-', '');
  }
  return rutSinPuntos;
}
