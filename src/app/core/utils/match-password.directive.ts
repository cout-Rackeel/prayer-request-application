import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CheckPasswordVal } from './checkPassword';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {

  @Input('appMatchPassword') passwords : string[] = [];
  validate(formSection: FormGroup): ValidationErrors | null {
    return CheckPasswordVal.validateFn(this.passwords[0], this.passwords[1])(formSection);
  }

}
