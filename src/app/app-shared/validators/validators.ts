import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

export function strValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        // unamePattern = "^[a-z0-9_-]{8,15}$";
        // pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
        // mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
        // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
        // NoSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

        let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const formControlValue: string = control.value;

        if (formControlValue?.length == 0) {
            return { 'empty': true, 'requiredValue': 10 }
        }

        if (formControlValue?.includes(' ')) {
            return { 'whiteSpace': true, 'requiredValue': 'white space' }
        }

        if (format.test(formControlValue)) {
            return { 'specialCharacter': true, 'requiredValue': 'native string' }
        }

        return null;

    }
}