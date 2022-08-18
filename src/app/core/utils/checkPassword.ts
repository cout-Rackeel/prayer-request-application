 import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

 export class CheckPasswordVal{

  static validateFn(ctrlName:string , checkPasswordName:string){
    return (formSection:FormGroup ) => {
      const control = formSection.controls[ctrlName];
      const checkPassword = formSection.controls[checkPasswordName];

      if (control?.errors && !control.errors['notMatching']) {
        return null;
      }

      if (control?.value !== checkPassword?.value) {
        checkPassword?.setErrors({notMatching:true})
        return {notMatching:true};
      }else{
        checkPassword?.setErrors(null);
        return null;
      }

    }
  }

 }
