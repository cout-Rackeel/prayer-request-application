import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrayerRequestDashboardComponent } from './prayer-request-dashboard/prayer-request-dashboard.component';
import { PrayerFormComponent } from './prayer-form/prayer-form.component';
import { PrayerRequestRoutingModule } from './prayer-request-routing.module';
import { YourPrayersComponent } from './your-prayers/your-prayers.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule} from'@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AllPrayersComponent } from './all-prayers/all-prayers.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  imports: [
    CommonModule,
    PrayerRequestRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule


  ],

  declarations: [
    PrayerRequestDashboardComponent,
    PrayerFormComponent,
    YourPrayersComponent,
    AllPrayersComponent,
    MoreInfoComponent
  ]

})
export class PrayerRequestModule { }
