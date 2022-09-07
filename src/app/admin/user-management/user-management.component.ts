import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Event } from '@angular/router';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { DialogLinkService, RolesService, UserManagementService } from 'src/app/core';
import { Role } from 'src/app/core/models/roles';
import { User } from 'src/app/core/models/user';
import Swal from 'sweetalert2';
import { AdminUserFormComponent } from '../admin-user-form/admin-user-form.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  users !: User[];
  roles !: Role[];
  delete = faX;
  currentUserRole : User = new User();
  cursorHere = false;
  addTrigger = false;
  removeTrigger = false;
  credTrigger = false;
  uniTrigger = false;
  editSwitch !: boolean;

    @ViewChild('addForm') addForm !: ElementRef;
    @ViewChild('credForm') credForm !: ElementRef;

    addRoleForm = {
       roles : []
    }

  constructor(
    private userService : UserManagementService,
    private roleService : RolesService,
    private dialog : MatDialog,
    private dialogLink : DialogLinkService,
    ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }


  getUsers(){
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  getRoles(){
    this.roleService.getAllRoles().subscribe(data => {
      data.forEach((role:any) => {
        role.isSelected = false
      })
      this.roles = data;
    })
  }

  openDialog(){
    this.dialog.open(AdminUserFormComponent,{
      width:"60%",
      minHeight:"350px"
    }).afterClosed().subscribe(val=>{
      if(val === 'user added'){
        this.getUsers();
      }
    })
  }

  deleteUser(id:string){
    this.setCurrentUser(id)
    let deleted : any;
    Swal.fire({
      title: 'Are you sure want to delete this user?',
      text: "You will not be able to recover this user's information after deleting!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUserById(id).subscribe( data => deleted = data);
        Swal.fire(
          'User Deleted!',
          `User has been successfully deleted`,
          'success'
        )
        this.getUsers();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `User has not been deleted`,
          'error'
        )
      }
    })
  }

  deleteRole(id:string){
    let currentUser = this.currentUserRole
    let newRoleList =  this.currentUserRole.roles?.filter((role) => role._id != id);
    currentUser.roles = newRoleList

    Swal.fire({
      title: 'Are you sure want to delete this role?',
      text: 'You will not be able to recover role later!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.userService.editUserById(currentUser._id, currentUser).subscribe();
        Swal.fire(
          'User role Deleted!',
          `User role has been successfully deleted`,
          'success'
        )
        this.getUsers();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `User role has not been deleted`,
          'error'
        )
      }
    })

  }

  setCurrentUser(id:string){
    this.userService.getUserById(id).subscribe(data => {
      this.currentUserRole = data
    });
  }

   editUser(user:any){
  this.dialogLink.setEditSwitchVal(true);
  this.dialog.open(AdminUserFormComponent , {
    data: user,
    width:"60%",
    minHeight:"350px"
  }).afterClosed().subscribe(val=>{
    this.dialogLink.setEditSwitchVal(false);
    this.getUsers();
})
 }

  moveIn(form:ElementRef , trigger:boolean){
    form.nativeElement.classList.remove('off');
    form.nativeElement.classList.add('on');
    trigger = !trigger
  }

  moveOut(form:ElementRef , trigger:boolean){
    form.nativeElement.classList.remove('on');
    form.nativeElement.classList.add('off');
    trigger = !trigger
  }

  close(form : string){
    if(form == 'addRole'){
      this.moveOut(this.addForm , this.addTrigger);
    }

    if(form == 'credForm'){
      this.moveOut(this.credForm , this.credTrigger)
    }

  }


  activateRemove(userId:string, e:any ){
    this.moveOut(this.addForm, this.addTrigger);
    this.moveOut(this.credForm, this.credTrigger);
    if(!this.removeTrigger){
      this.setCurrentUser(userId)
      this.removeTrigger = !this.removeTrigger;
    }else{
      alert('off')
      this.removeTrigger = !this.removeTrigger;
    }

  }

  activateAdd(userId:string ,  e:any){
    this.setCurrentUser(userId)

    this.moveOut(this.credForm, this.credTrigger);
    if(!this.addTrigger){
      this.moveIn(this.addForm , this.addTrigger)
    }else{
      this.moveOut(this.addForm , this.addTrigger);
    }

  }

  activateCred(userId:string  ,  e:any){
    this.setCurrentUser(userId)

    this.moveOut(this.addForm, this.addTrigger);
  if(!this.credTrigger){
    this.moveIn(this.credForm , this.credTrigger);
  }else{
    this.moveOut(this.credForm , this.credTrigger);
  }

  }

  addRole(addRoleForm : NgForm){
    let roles = this.roles.filter(x => x.isSelected == true);
    roles.forEach((role) =>{
     let checkDuplicateRoles = this.currentUserRole.roles?.filter(r => r._id != role._id)

     if(checkDuplicateRoles == this.currentUserRole.roles){
      this.currentUserRole.roles = checkDuplicateRoles
      this.currentUserRole.roles?.push(role);
      this.userService.editUserById(this.currentUserRole._id , this.currentUserRole).subscribe({
        complete: () => {
          Swal.fire('Successfully Added');
          this.getUsers();
          addRoleForm.reset();
          this.moveOut(this.addForm , this.addTrigger);
        }
      })
     }



    })




    console.log(this.currentUserRole.roles)
  }

}
