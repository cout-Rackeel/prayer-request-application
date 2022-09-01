import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users !: User[];

  constructor(private userService : UserManagementService) { }


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }

}
