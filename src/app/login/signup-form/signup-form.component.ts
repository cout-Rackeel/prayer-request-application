import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  constructor() { }

  signUpForm = {
    id:'',
    firstname : '',
    lastname : '',
    username : '',
    email:'',
    password:'',
    pals: [],
    roles:[]
  }

  ngOnInit(): void {
  }

  onSubmit(){

      alert(`${JSON.stringify(this.signUpForm)}`);
    }


}
