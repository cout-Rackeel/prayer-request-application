import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginFormComponent } from './login-form/login-form.component';

import { SignupFormComponent } from './signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule, MatchPasswordDirective } from '../core';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    SignupFormComponent,
    LoginDashboardComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],


})
export class LoginModule { }
