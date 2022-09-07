import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLinkService, RolesService, UserManagementService } from 'src/app/core';
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
  editedUser !: User;
  editSwitch !: boolean

  constructor(
    private authService : AuthService,
    private router : Router,
    private dialogLink :DialogLinkService,
    private roleService : RolesService,
    private userService : UserManagementService,
    private dialog : MatDialogRef<AdminUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: User
    ) { }

  newUserForm : any ={
    firstname : '',
    lastname : '',
    username : '',
    email:'',
    password:'',
    confirmPassword:'',
    pals: '',
    roles: []
  }

  ngOnInit(): void {
    this.getRoles();
    this.setBehavioral()

    if(this.editSwitch){
      alert(JSON.stringify(this.dialogData.roles))
      this.setForm();


    }
  }

  setForm(){

    if(this.dialogData){
      this.newUserForm = {
        firstname : this.dialogData.firstname,
        lastname : this.dialogData.lastname,
        username : this.dialogData.username,
        email:this.dialogData.email,
        password:this.dialogData.password,
        confirmPassword:'',
        pals: '',
        roles: this.dialogData.roles
      }
    }
  }

  setBehavioral(){
    this.dialogLink.getEditSwitchVal().subscribe(data => this.editSwitch = data)
  }

  onSubmit(userForm:NgForm, e :any){
    let formVal : Partial<User> = {
      _id: '',
      firstname :this.newUserForm.firstname.trim().toLowerCase(),
      lastname :  this.newUserForm.lastname.trim().toLowerCase(),
      username : this.newUserForm.username.trim().toLowerCase(),
      email: this.newUserForm.email.trim().toLowerCase(),
      password: this.newUserForm.password.trim(),
      roles : this.roles.filter(x => x.isSelected == true).map(x => x._id)
    };

    if(userForm.form.valid){

      console.log(JSON.stringify(formVal));

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
          this.dialog.close('user added');
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

  updateUser(){
    alert('Update')
  }

}

class role {
  _id!:string;
  name!:string;
  isSelected!:boolean;
}
