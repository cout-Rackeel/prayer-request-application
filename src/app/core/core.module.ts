import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DialogLinkService, PrayerSearchService, PrayerService, TruthService, UserManagementService } from './services';
import { FormsModule } from '@angular/forms';
import { MatchPasswordDirective } from './utils/match-password.directive';
import { CheckPasswordVal } from './utils';
import { httpInterceptorProviders } from './interceptors';
import { UserGuard } from './guards';
import { RolesService } from './services/roles.service';



@NgModule({
  declarations: [
    MatchPasswordDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule

  ],
  providers:[
    PrayerService,
    DialogLinkService,
    TruthService,
    UserGuard,
    CheckPasswordVal,
    PrayerSearchService,
    UserManagementService,
    RolesService
    // httpInterceptorProviders,
  ],
  exports:[
    MatchPasswordDirective
  ]
})
export class CoreModule { }
