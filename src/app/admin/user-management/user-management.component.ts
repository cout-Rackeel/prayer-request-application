import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RolesService, UserManagementService } from 'src/app/core';
import { Role } from 'src/app/core/models/roles';
import { User } from 'src/app/core/models/user';
import Swal from 'sweetalert2';
import { AdminUserFormComponent } from '../admin-user-form/admin-user-form.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users !: User[];
  roles !: Role[];

  constructor(
    private userService : UserManagementService,
    private roleService : RolesService,
    private dialog : MatDialog
    ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

  getRoles(){
    this.roleService.getAllRoles().subscribe(data => this.roles = data);
    console.log(this.roles);
  }

  openDialog(){
    this.dialog.open(AdminUserFormComponent,{
      width:"60%",
      minHeight:"350px"
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getUsers();
      }
    })
  }

  deleteUser(id:string){
    let deleted : any;
    Swal.fire({
      title: 'Are you sure want to delete this prayer request?',
      text: 'You will not be able to recover this request later!',
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

}
