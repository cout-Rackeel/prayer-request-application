import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm = {
    username: '',
    password: '',
  };

  errorMessage = '';
  roles: string[] | undefined = [];
  passwordIncorrect: boolean = false;
  userNotFound: boolean = false;
  invalidUsername = '';
  invalidPassword = '';

  constructor(
    private authService: AuthService,
    private storageService: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false
    }
  }

  onSubmit(login: NgForm) {
    let formVal: Partial<User> = this.loginForm;
    formVal.username = formVal.username?.trim().toLowerCase();
    if (login.form.valid) {
      this.authService.signIn(formVal).subscribe({
        next: (data) => {
          this.storageService.saveUser(data);
          Swal.fire(
            'Thank you...',
            'You have succesfully logged in!',
            'success'
          );
        },

        error: (err: HttpErrorResponse) => {
          Swal.fire('Oops.......', JSON.stringify(err.error.message), 'error');

          if (err.error.userNotFound) {
            this.userNotFound = true;
            this.invalidUsername = formVal.username!;
          } else {
            this.userNotFound = false;
          }

          if (err.error.passwordInvalid) {
            this.passwordIncorrect = true;
            this.invalidPassword = formVal.password!;
          } else {
            this.passwordIncorrect = false;
          }

          console.log(err.error);
        },

        complete: () => {
          this.storageService.isLoggedIn();
          this.storageService.getUser();
          this.router.navigate(['/home']);
          setTimeout(() => {
            window.location.reload();
          }, 1*1000)

        },
      });
      console.log(`${JSON.stringify(formVal)}`);
    }
  }

  isChangedUsername() {
    if (this.invalidUsername !== this.loginForm.username) {
      this.userNotFound = false;
      return true;
    } else {
      return false;
    }
  }

  isChangedPassword() {
    if (this.invalidPassword !== this.loginForm.password) {
      this.passwordIncorrect = false;
      return true;
    } else {
      return false;
    }
  }

  // changedUsername(){}
  // changedPassword(){
  //   if(this.passwordIncorrect)
  // }
}
