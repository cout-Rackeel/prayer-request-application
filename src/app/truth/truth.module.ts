import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruthRoutingModule } from './truth-routing.module';
import { TruthComponent } from './truth.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    TruthComponent
  ],
  imports: [
    CommonModule,
    TruthRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class TruthModule { }
