import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const forbiddenNameValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const forbidden = ['admin', 'root'];
  return forbidden.includes(control.value?.toLowerCase()) ? { forbiddenName: true } : null;
};
