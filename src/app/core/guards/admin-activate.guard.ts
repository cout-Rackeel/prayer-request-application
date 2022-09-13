import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminActivateGuard implements CanActivate {

  constructor(private storageService : SessionStorageService , private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      let user = this.storageService.getUser();
      let userRoleFound = false;

      if(user.roles){
        for(var i = 0; i <= user.roles.length-1; i++){
          if(user.roles[i] == 'ROLE_ADMIN'){
            return userRoleFound = true;
          }
        }
      }else{
        Swal.fire('Oh no..... ','Login to your account or signup for an account to view your own prayers');
        this.router.navigate(['/login']);
      }

      return userRoleFound


  }

}
