import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //* LAZY LOADING SYNTAX (Do research)
  //ng generate module customers --route customers --module app.module

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path:'prayers',
    loadChildren: () => import('./prayer-request/prayer-request.module').then( m => m.PrayerRequestModule)
  },


  {
    path:'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },


  {
     path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
 },

  { path: 'truth', loadChildren: () => import('./truth/truth.module').then(m => m.TruthModule) },

  { path: 'about-us', loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
