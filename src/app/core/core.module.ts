import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DialogLinkService, PrayerService, TruthService } from './services';
import { FormsModule } from '@angular/forms';
import { MatchPasswordDirective } from './utils/match-password.directive';
import { CheckPasswordVal } from './utils';



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
    CheckPasswordVal,
  ],
  exports:[
    MatchPasswordDirective
  ]
})
export class CoreModule { }
