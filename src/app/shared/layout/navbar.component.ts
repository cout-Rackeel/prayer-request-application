import { Component, OnInit, HostListener, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { faInbox, faMailBulk, faMailReply, faMailReplyAll, faMessage, faPerson, faPersonArrowUpFromLine, faSearch, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faDonate } from '@fortawesome/free-solid-svg-icons';
import { SessionStorageService } from "src/app/core";
import { User } from "src/app/core/models/user";
import Swal from 'sweetalert2';


@Component({
  selector:'app-layout-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  search = faSearch;
  signIn = faSignIn;
  donate = faDonate;
  inbox =  faInbox;
  signOut = faSignOut;
  profile = faPerson;
  loggedIn : boolean = false;
  user !: Partial<User>

  constructor(
    private el:ElementRef,
    private storageService: SessionStorageService,
    private router : Router
    ) { }


  ngOnInit(): void {
    this.getLoginStatus();
    this.getUser();
    this.onScroll();
  }


  onScroll(){

    const navbar = this.el.nativeElement;
    const rooty = document.querySelector('.home-intro')

   const options = {
    root:null,
    threshold:0,
    rootMargin:"200px 0px 0px 0px"
  };
   const observerOne = new IntersectionObserver(function(entries,options){
    entries.forEach( entry => {
      if(!entry.isIntersecting){
        entry.target.classList.remove('fixed');
        console.log(entry.isIntersecting);
        return;
      }else{
        entry.target.classList.add('fixed')
        console.log(rooty);
        observerOne.unobserve(navbar)

      }
    })
  },options);

  observerOne.observe(navbar)
}

getLoginStatus(){
 this.loggedIn = this.storageService.isLoggedIn();
 this.getUser();
}

getUser(){
  this.user = this.storageService.getUser();
}

logOut(){
  this.storageService.logOut();
  Swal.fire('Thank you...', 'You have succesfully logged out!', 'success')
  this.getLoginStatus();
  this.getUser();
  this.router.navigate(['/home']);
}

checkAdmin(){
  if(this.user.roles){
    for( var i = 0; i <= this.user.roles.length-1; i++){
      if(this.user.roles[i] == "ROLE_ADMIN"){
       return true
      }
    }
  }
  return false;
}






}
