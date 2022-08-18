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



@NgModule({
  imports: [
    CommonModule,
    PrayerRequestRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,

  ],

  declarations: [
    PrayerRequestDashboardComponent,
    PrayerFormComponent,
    YourPrayersComponent
  ]

})
export class PrayerRequestModule { }
