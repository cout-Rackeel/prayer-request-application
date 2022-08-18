import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [

  {
    path:'',
    component:LoginDashboardComponent
  },
  
  {
    path:'login',
    component:LoginFormComponent
  },

  {
    path:'signup',
    component:SignupFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
