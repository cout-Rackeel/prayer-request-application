import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { login } from 'src/app/core/models/login';
import { AuthService } from 'src/app/core/services/auth.service';

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

  passwordIncorrect : boolean | null = null;
  userNotFound : boolean | null = null;

  constructor(private authService : AuthService ) {

   }

  ngOnInit(): void {
  }

  onSubmit(login:NgForm){
    let formVal : login = this.loginForm;
    this.authService.signIn(formVal).subscribe({
      next : (resp) => {
        alert(JSON.stringify(resp))
      }
    })
    console.log(`${JSON.stringify(formVal)}`);
  }



  // changedUsername(){}
  // changedPassword(){
  //   if(this.passwordIncorrect)
  // }
}
