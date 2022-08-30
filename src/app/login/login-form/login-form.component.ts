import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/core/models/login';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm = {
    username: '',
    password:''
  }

  errorMessage = '';
  roles: string[] | undefined = [];
  passwordIncorrect : boolean = false;
  userNotFound : boolean = false;
  invalidUsername = '';
  invalidPassword = '';

  constructor(private authService : AuthService ,
              private storageService : SessionStorageService,
              private router : Router
             ) {}

  ngOnInit(): void {

  }

  onSubmit(login:NgForm){
    let formVal : login = this.loginForm;
    if(login.form.valid){
      this.authService.signIn(formVal).subscribe({
        next : (data) => {
        this.storageService.saveUser(data);
        },

        error: (err:HttpErrorResponse) => {

          alert(JSON.stringify(err.error.message))

          if(err.error.userNotFound){
            this.userNotFound = true;
            this.invalidUsername = formVal.username
          }else{
            this.userNotFound = false;
          }

          if(err.error.passwordInvalid){
            this.passwordIncorrect = true
            this.invalidPassword = formVal.password
          }else{
            this.passwordIncorrect = false;
          }

          console.log(err.error);
        },

        complete: () =>{
          this.storageService.isLoggedIn();
          this.storageService.getUser();
          location.reload();
          alert('Sucessfully logged in!')
          this.router.navigate(['/home'],);
        }
      })
      console.log(`${JSON.stringify(formVal)}`);
    }

  }

  isChangedUsername(){
    if(this.invalidUsername !== this.loginForm.username){
      this.userNotFound = false
      return true
    }else{
      return false
    }
  }

  isChangedPassword(){
    if(this.invalidPassword !== this.loginForm.password){
      this.passwordIncorrect = false;
      return true
    }else{
      return false;
    }
  }




  // changedUsername(){}
  // changedPassword(){
  //   if(this.passwordIncorrect)
  // }
}