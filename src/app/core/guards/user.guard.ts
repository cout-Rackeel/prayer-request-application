import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private storageService : SessionStorageService , private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      console.log('CanActivate called');
      let user = this.storageService.getUser();
      let userRoleFound = false;

      if(user.roles){
        for(var i = 0; i <= user.roles.length-1; i++){
          if(user.roles[i] == 'ROLE_USER'){
            return userRoleFound = true;
          }
        }
      }else{
        alert('Login or Sign up for an account today!!')
        this.router.navigate(['/login']);
      }

      return userRoleFound


  }

}
