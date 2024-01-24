import { AbstractControl, ValidationErrors } from '@angular/forms';

export function alphabeticValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (/^[a-zA-Z\s]+$/.test(value)) {
    return null;
  } else {
    return { alphabetic: true };
  }
}

export function ageValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(value > 18) {
        return null;
    } else {
        return { ageRestricted: true }
    }
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Use a regular expression to validate the email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (emailPattern.test(value)) {
      return null; // Validation passes
    } else {
      return { invalidEmail: true }; // Validation fails
    }
  }