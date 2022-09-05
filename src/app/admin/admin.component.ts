import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  simpleAlert(){
    Swal.fire('Hello world!');
  }

  alertWithSuccess(){
    Swal.fire('Thank you...', 'You have succesfully logged in!', 'success')
  }



}


