import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, AbstractControl, ValidationErrors } from '@angular/forms'

@Directive({
  selector: '[validateStr]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: StrValidatorDirective, multi: true }
  ]
})

export class StrValidatorDirective implements Validator {

  format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  //Implement Validator interface that uses validate method
  validate(_formControl: FormControl) {

    // retrive value from the form-control
    let formControlValue: string = _formControl.value;

    if (formControlValue?.length == 0) {
      return { 'empty': true, 'requiredValue': 10 }
    }

    if (formControlValue?.includes(' ')) {
      return { 'whiteSpace': true, 'requiredValue': 'white space' }
    }

    if (this.format.test(formControlValue)) {
      return { 'specialCharacter': true, 'requiredValue': 'native string' }
    }

    return null;
  }

}

