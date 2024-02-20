import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import {AuthGuardService as AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule),
    // canActivate : [AuthGuard]
  },
  {
    path : 'film',
    loadChildren: () => import('./film/film.module').then(m=>m.FilmModule),
    canActivate : [AuthGuard]
  },
  {
    path : 'users',
    loadChildren: () => import('./users/users.module').then(m=>m.UsersModule),
    // canActivate : [AuthGuard]
  },
  {
    path : '404',
    component: Error404PageComponent

  },
  {
    path : '',
    redirectTo: 'film',
    pathMatch: 'full'
  },
  {
    path : '**',
    redirectTo:'404'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
