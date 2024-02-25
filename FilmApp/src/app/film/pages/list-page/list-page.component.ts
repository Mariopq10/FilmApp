import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Film, Page } from '../../interfaces/film';
import { Genre } from '../../interfaces/genre';

@Component({
  selector: 'list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  @Input()
  public filmArray: Film[] = []; // Array que contiene las películas a mostrar en la lista

  currentPage = 1;
  totalPages: number = 0;
  pagesToShow: number = 5;
  constructor(private filmService: FilmService) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se encarga de obtener las películas de la primera página si el array de películas está vacío.
   */
  ngOnInit() {
    if (this.filmArray.length == 0) {
      this.filmService.getRatedFilms(this.currentPage).subscribe((films: any) => { this.filmArray = films.results; this.totalPages = films.total_pages })
    }
  }

  /**
   * Método para generar los números de página a mostrar en la barra de navegación.
   * @returns Un array con los números de página.
   */
  generatePageNumbers(): number[] {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);
    return Array.from({ length: (endPage - startPage) + 1 }, (_, index) => index + startPage);
  }

  /**
   * Método para cargar la siguiente página de películas.
   */
  loadMore(): void {
    this.currentPage++;
    this.filmService.getRatedFilms(this.currentPage).subscribe((films: any) => { this.filmArray = films.results })
  }

  /**
   * Método para cargar la página anterior de películas.
   */
  loadMinus(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filmService.getRatedFilms(this.currentPage).subscribe((films: any) => { this.filmArray = films.results })
    }
  }

  /**
   * Método para cargar una página específica de películas.
   * @param page El número de página a cargar.
   */
  loadPage(page: number): void {
    this.currentPage = page;
    this.filmService.getRatedFilms(page).subscribe((films: any) => { this.filmArray = films.results })
  }
}
