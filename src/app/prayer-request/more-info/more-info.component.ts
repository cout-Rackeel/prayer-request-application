import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prayer } from 'src/app/core';
import { AllPrayersComponent } from '../all-prayers/all-prayers.component';
import { YourPrayersComponent } from '../your-prayers/your-prayers.component';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Partial<Prayer>,
              ) { }

  ngOnInit(): void {
  }

}
