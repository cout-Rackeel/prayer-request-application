import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  AdminsGuard } from './core/guards';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'  },

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

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canLoad:[AdminsGuard]},

  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload'
    },

    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
