import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film, Page } from '../../interfaces/film';
import { Genre } from '../../interfaces/genre';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  //Prueba
  genres : Genre[]=[]



  filmArray : Film[] = []
  currentPage = 1;
  totalPages: number = 0;
  pagesToShow: number = 5;
  constructor( private filmService : FilmService) { }

  ngOnInit() {
    // this.filmService.getGenres().subscribe((genre : any) =>{this.genres = genre.results})

    this.filmService.getFilms(this.currentPage).subscribe((films : any)=> {this.filmArray = films.results; this.totalPages = films.total_pages})
  }


  //Funcion principal, la que he usado desde el principio.
  getNovedades() : void{
    this.filmService.getFilms(this.currentPage).subscribe((films : any)=> {this.filmArray = films.results; this.totalPages = films.total_pages})

  }





  //Funcion para el navigator
  generatePageNumbers(): number[] {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);
    return Array.from({ length: (endPage - startPage) + 1 }, (_, index) => index + startPage);
  }

  //Funcion para cargar siguiente pagina
  loadMore(): void {
    this.currentPage++;
    this.filmService.getFilms(this.currentPage).subscribe((films : any)=> {this.filmArray = films.results})
  }

  //Funcion para cargar pagina anterior
  loadMinus(): void {
    if(this.currentPage>1){
      this.currentPage--;
      this.filmService.getFilms(this.currentPage).subscribe((films : any)=> {this.filmArray = films.results})
    }
  }

  //Funcion que carga una pagina a la que se le pasa el numero de pagina por parametro.
  loadPage(page: number): void {
    this.currentPage = page;
    this.filmService.getFilms(page).subscribe((films : any)=> {this.filmArray = films.results})

  }




}
