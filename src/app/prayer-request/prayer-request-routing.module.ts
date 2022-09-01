import { Component, NgModule } from "@angular/core";
import { Routes , RouterModule } from "@angular/router";
import { UserGuard } from "../core/guards";
import { AllPrayersComponent } from "./all-prayers/all-prayers.component";
import { PrayerRequestDashboardComponent } from "./prayer-request-dashboard/prayer-request-dashboard.component";
import { YourPrayersComponent } from "./your-prayers/your-prayers.component";

const routes : Routes = [
  {
    path:'' ,
    component:PrayerRequestDashboardComponent
  },

  {
    path:'your-prayers/:id',
    component:YourPrayersComponent,
    canActivate:[UserGuard]
  },

  {
    path:'all-prayers',
    component: AllPrayersComponent
  }


];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class PrayerRequestRoutingModule { }
