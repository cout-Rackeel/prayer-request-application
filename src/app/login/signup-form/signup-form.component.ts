import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
    private cf : ChangeDetectorRef
  ) { }

  signUpForm = {
    firstname : '',
    lastname : '',
    username : '',
    email:'',
    password:'',
    confirmPassword:'',
    pals: [],
    roles:[]
  }

  savedUser !: User;
  usernameAlreadyUsed :boolean = false;
  emailAlreadyUsed :boolean = false;
  invalidUsername = '';
  invalidEmail = '';

  ngOnInit(): void {
  }

  onSubmit(signUp:NgForm){
    let formVal : User = {
      _id: '',
      firstname :this.signUpForm.firstname.trim().toLowerCase(),
      lastname :  this.signUpForm.lastname.trim().toLowerCase(),
      username : this.signUpForm.username.trim().toLowerCase(),
      email: this.signUpForm.email.trim().toLowerCase(),
      password: this.signUpForm.password,
      pals: []
    };

    if(signUp.form.valid){
       this.authService.signUp(formVal).subscribe({
        next: (resp:any) => {
          this.usernameAlreadyUsed = false;
          this.emailAlreadyUsed = false;
          console.log(`${JSON.stringify(formVal)}`);
          alert(`Form Sent`)
        },
        error: (err:HttpErrorResponse) => {
          if(err.error.errType == 'username'){
            this.usernameAlreadyUsed = true;
            this.invalidUsername = formVal.username;
          }

          if(err.error.errType == 'email'){
            this.emailAlreadyUsed = true;
            this.invalidEmail = formVal.email;
          }

          console.log(err.error);
        },
        complete: () =>{
          alert('Account Successfully made, please login');
          this.router.navigate(['/login/login'],);
        }
       });

    }


    }

  isChangedUsername(){
      if(this.invalidUsername !== this.signUpForm.username){
        this.usernameAlreadyUsed = false
        return true
      }else{
        return false
      }
    }

  isChangedEmail(){
      if(this.invalidEmail !== this.signUpForm.email){
        this.emailAlreadyUsed = false
        return true
      }else{
       return false
      }
    }



}