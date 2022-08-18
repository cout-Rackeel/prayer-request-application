import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruthComponent } from './truth.component';

const routes: Routes = [{ path: '', component: TruthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TruthRoutingModule { }
