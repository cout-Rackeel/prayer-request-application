import { Directive, Input } from '@angular/core';
import { Validator } from '@angular/forms';
import { CheckPasswordVal } from './checkPassword';

@Directive({
  selector: '[appMatchPassword]'
})
export class MatchPasswordDirective implements Validator {

  @Input('appMatchPassword') passwords : string[] = []


}
