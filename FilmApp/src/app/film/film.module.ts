import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmPageComponent } from './pages/film-page/film-page.component';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../material/material.module';
import { FilmRoutingModule } from './film-routing.module';
import { FilmImgPipe } from './pipes/film-img.pipe';
import { GenreComponent } from './pages/genre-page/genre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavPageComponent } from './pages/fav-page/fav-page.component';



@NgModule({
  declarations: [
    FilmPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    SearchPageComponent,
    GenreComponent,
    CardComponent,
    FilmImgPipe,
    FavPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FilmRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers : [
    FilmImgPipe
  ]
})
export class FilmModule { }
