import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { FilmPageComponent } from './pages/film-page/film-page.component';
import { GenreComponent } from './pages/genre-page/genre.component';
import { FavPageComponent } from './pages/fav-page/fav-page.component';


const routes: Routes = [
{
  path:'',
  component: LayoutPageComponent,
  children:[
    {path:'search', component:SearchPageComponent},
    {path:'list', component:ListPageComponent},
    {path:'genre', component:GenreComponent},
    {path:'favs', component:FavPageComponent},
    {path:':id', component:FilmPageComponent},
    {path:'**', redirectTo:'list'},
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
