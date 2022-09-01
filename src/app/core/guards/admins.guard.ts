import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AdminsGuard implements CanLoad {

  constructor(
    private storageService : SessionStorageService,
    private router : Router
    ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]):  boolean {

      let user = this.storageService.getUser();
      let adminRoleFound = false;

      if(user.roles){
        const  role = user.roles.find(name => name == 'ROLE_ADMIN')
        if(role == 'ROLE_ADMIN'){
          return adminRoleFound = true;
        }else{
          this.router.navigate(['/home']);
        }
      }else{
        this.router.navigate(['/home']);
      }
      return adminRoleFound;

  }
}
