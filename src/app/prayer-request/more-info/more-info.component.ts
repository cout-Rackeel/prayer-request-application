import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prayer, PrayerService } from 'src/app/core';
import { AllPrayersComponent } from '../all-prayers/all-prayers.component';
import { YourPrayersComponent } from '../your-prayers/your-prayers.component';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {

  prayerRequest !: Prayer;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : string,
    private prayerService : PrayerService,
              ) { }

  ngOnInit(): void {
    this.getPrayerRequest();
  }

  getPrayerRequest(){
    this.prayerService.findPrayerRequest(this.data).subscribe(resp => this.prayerRequest = resp.data?.['prayer'] as Prayer);
  }

}
