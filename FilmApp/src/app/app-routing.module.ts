import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  // {
  //   path : 'auth',
  //   loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule),
  //   //canMatch : [logged]
  // },
  {
    path : 'film',
    loadChildren: () => import('./film/film.module').then(m=>m.FilmModule),
    //canMatch : [canMatchGuard]
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
