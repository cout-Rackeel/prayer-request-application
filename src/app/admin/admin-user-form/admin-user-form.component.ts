import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService, UserManagementService } from 'src/app/core';
import { Role } from 'src/app/core/models/roles';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-form',
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.css']
})
export class AdminUserFormComponent implements OnInit {

  savedUser !: User;
  usernameAlreadyUsed :boolean = false;
  emailAlreadyUsed :boolean = false;
  invalidUsername = '';
  invalidEmail = '';
  roles !: Role[];
  users !: User[];

  constructor(
    private authService : AuthService,
    private router : Router,
    private roleService : RolesService,
    private userService : UserManagementService,
    ) { }

  newUserForm = {
    firstname : '',
    lastname : '',
    username : '',
    email:'',
    password:'',
    confirmPassword:'',
    pals: '',
    roles: [] as string[]
  }

  ngOnInit(): void {
    this.getRoles();
  }

  onSubmit(userForm:NgForm){
    let formVal : Partial<User> = {
      _id: '',
      firstname :this.newUserForm.firstname.trim().toLowerCase(),
      lastname :  this.newUserForm.lastname.trim().toLowerCase(),
      username : this.newUserForm.username.trim().toLowerCase(),
      email: this.newUserForm.email.trim().toLowerCase(),
      password: this.newUserForm.password.trim(),
      roles : this.roles.filter(x => x.isSelected == true).map(x => x._id) as string[]
    };

    if(userForm.form.valid){

      console.log(JSON.stringify(formVal));

      alert('submitted');


       this.authService.signUp(formVal).subscribe({
        next: (resp:any) => {
          this.usernameAlreadyUsed = false;
          this.emailAlreadyUsed = false;
          console.log(`${JSON.stringify(formVal)}`);
        },
        error: (err:HttpErrorResponse) => {
          if(err.error.errType == 'username'){
            this.usernameAlreadyUsed = true;
            this.invalidUsername = formVal.username!;
          }

          if(err.error.errType == 'email'){
            this.emailAlreadyUsed = true;
            this.invalidEmail = formVal.email!;
          }

          console.log(err.error);
        },
        complete: () =>{
          Swal.fire('User added!', 'You have succesfully added a user!', 'success');
        }
       });

    }


    }

  getRoles(){
    this.roleService.getAllRoles().subscribe(data => {
      data.forEach((role:any) => {
        role.isSelected = false
      })
      this.roles = data;
    })
  }


  isChangedUsername(){
      if(this.invalidUsername !== this.newUserForm.username.trim().toLowerCase()){
        this.usernameAlreadyUsed = false
        return true
      }else{
        return false
      }
    }

  isChangedEmail(){
      if(this.invalidEmail !== this.newUserForm.email){
        this.emailAlreadyUsed = false
        return true
      }else{
       return false
      }
    }

    onChange(){
      console.log(this.roles);
    }

}

class role {
  _id!:string;
  name!:string;
  isSelected!:boolean;
}
