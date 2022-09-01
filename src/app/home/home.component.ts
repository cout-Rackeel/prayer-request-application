import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../core';
import { User } from '../core/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private storageService: SessionStorageService
  ) { }

  user !: Partial<User>;
  loggedIn !: boolean;

  ngOnInit(): void {
    this.getUser();
    this.getLoggedIn();
  }

  getUser(){
    return this.user = this.storageService.getUser();
  }

  getLoggedIn(){
    return this.loggedIn = this.storageService.isLoggedIn();
  }


}
