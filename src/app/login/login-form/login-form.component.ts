import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() {

   }

  ngOnInit(): void {
  }

  onSubmit(){
    alert(`${JSON.stringify(this.loginForm.username)}`);
  }

}
