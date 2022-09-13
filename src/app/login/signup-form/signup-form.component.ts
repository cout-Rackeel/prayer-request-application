import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
  ) { }

  signUpForm = {
    firstname : '',
    lastname : '',
    username : '',
    email:'',
    password:'',
    confirmPassword:'',
    pals: '',
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
    let formVal : Partial<User> = {
      _id: '',
      firstname :this.signUpForm.firstname.trim().toLowerCase(),
      lastname :  this.signUpForm.lastname.trim().toLowerCase(),
      username : this.signUpForm.username.trim().toLowerCase(),
      email: this.signUpForm.email.trim().toLowerCase(),
      password: this.signUpForm.password.trim(),
    };

    if(signUp.form.valid){
       this.authService.signUp(formVal).subscribe({
        next: (resp:any) => {
          this.usernameAlreadyUsed = false;
          this.emailAlreadyUsed = false;
        },
        error: (err:HttpErrorResponse) => {
          if(err.error.data.errType == 'username'){
            this.usernameAlreadyUsed = true;
            this.invalidUsername = formVal.username!;
          }

          if(err.error.data.errType == 'email'){
            this.emailAlreadyUsed = true;
            this.invalidEmail = formVal.email!;
          }

          console.log(err.error);
        },
        complete: () =>{
          Swal.fire('Thank you...', 'You have succesfully signed up! Now login into your account', 'success');
          this.router.navigate(['/login/login'],);
        }
       });

    }


    }

  isChangedUsername(){
      if(this.invalidUsername !== this.signUpForm.username.trim().toLowerCase()){
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
