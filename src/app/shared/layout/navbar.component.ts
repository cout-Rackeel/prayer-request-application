import { Component, OnInit, HostListener, ElementRef } from "@angular/core";
import { faInbox, faMailBulk, faMailReply, faMailReplyAll, faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faDonate } from '@fortawesome/free-solid-svg-icons';


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

  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    this.onScroll()
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






}
