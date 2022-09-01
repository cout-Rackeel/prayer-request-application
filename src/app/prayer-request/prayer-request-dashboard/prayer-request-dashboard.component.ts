import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { faPray } from '@fortawesome/free-solid-svg-icons';
import { SessionStorageService } from 'src/app/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-prayer-request-dashboard',
  templateUrl: './prayer-request-dashboard.component.html',
  styleUrls: ['./prayer-request-dashboard.component.css']
})
export class PrayerRequestDashboardComponent implements OnInit {

  constructor(
    private storageService : SessionStorageService,
    private router : Router
    ) { }

    user  = this.storageService.getUser();
    loggedIn = this.storageService.isLoggedIn();
    praying = faPray;

  ngOnInit(): void {
    this.getSessionCredientials();
  }

  getSessionCredientials(){
    if(this.loggedIn){
      this.user = this.storageService.getUser();
    }
  }

  goToYourPrayers(){
    this.router.navigate([`/prayers/your-prayers/${this.user._id}`]);
  }



}
