import { Component, NgModule } from "@angular/core";
import { Routes , RouterModule } from "@angular/router";
import { PrayerRequestDashboardComponent } from "./prayer-request-dashboard/prayer-request-dashboard.component";
import { YourPrayersComponent } from "./your-prayers/your-prayers.component";

const routes : Routes = [
  {
    path:'' ,
    component:PrayerRequestDashboardComponent
  },

  {
    path:'yours',
    component:YourPrayersComponent
  }
];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class PrayerRequestRoutingModule { }
