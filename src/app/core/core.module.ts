import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DialogLinkService, PrayerSearchService, PrayerService, TruthService } from './services';
import { FormsModule } from '@angular/forms';
import { MatchPasswordDirective } from './utils/match-password.directive';
import { CheckPasswordVal } from './utils';
import { httpInterceptorProviders } from './interceptors';
import { UserGuard } from './guards';



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
    PrayerSearchService
    // httpInterceptorProviders,
  ],
  exports:[
    MatchPasswordDirective
  ]
})
export class CoreModule { }
