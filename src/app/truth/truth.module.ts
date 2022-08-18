import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruthRoutingModule } from './truth-routing.module';
import { TruthComponent } from './truth.component';


@NgModule({
  declarations: [
    TruthComponent
  ],
  imports: [
    CommonModule,
    TruthRoutingModule
  ]
})
export class TruthModule { }
