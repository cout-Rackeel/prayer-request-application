 import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

 export class CheckPasswordVal{

  static validateFn(ctrlName:string , checkPassword:string){
    return (formSection:FormGroup ): ValidationErrors | null => {
      const control = formSection.controls[ctrlName];
      const checkPassword = formSection.controls[checkPassword];

      if (control?.errors && !control.errors['Notmatching']) {
        return null;
      }

      if (control?.value !== checkPassword.value) {
        checkPassword.setErrors({notMatching:true})
        return {notMatching:true};
      }else{
        checkPassword.setErrors(null);
        return null;
      }

    }
  }

 }
