import { Component, ElementRef, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Film } from '../../interfaces/film';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public filmList: Film[] = []; // Array que almacena las películas encontradas
  public searchForm: FormGroup;
  public busqueda: string = ""

  // Variable para almacenar el número de página actual
  public currentPage: number = 1;
  // Variable de bandera para mostrar u ocultar el botón
  public showLoadMoreBtn: boolean = false;

  constructor(
    public filmService: FilmService,
    private elementRef: ElementRef,
  ) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('')
    });
  }

  ngOnInit(): void {
    console.log(this.filmList)
  }

  /**
   * Método para realizar la búsqueda de películas.
   * Se almacena el valor que recoge el formulario en una const finder y llamamos a la funcion loadFilms() para cargar las peliculas
   */
  public search() {
    const finder = this.searchForm.get('searchInput')!.value;
    if (!finder.trim()) {
      return;
    }
    this.currentPage = 1;
    this.loadFilms();
  }


  //Funcion que realiza la carga de las peliculas llamando al servicio y realizando subscribe sobre el array de Film[]

  /**
   * Método para cargar las películas correspondientes a la búsqueda.
   * Realiza la carga de las peliculas llamando al servicio y realizando subscribe sobre el array de Film[]
   */
  private loadFilms() {
    this.busqueda = this.searchForm.get('searchInput')!.value;
    this.filmList = []
    this.filmService.getMoviesByQuery(this.busqueda, this.currentPage).subscribe(
      (films: any) => {
        if (films.results) {
          this.filmList = [...this.filmList, ...films.results]
          this.showLoadMoreBtn = true;
          //No cargar mas peliculas si no recibe results
        } else {
          // this.showLoadMoreBtn = false
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      });
  }

  /**
   * Método que modifica el valor de la página actual para realizar una busqueda en la siguiente page
   *
   */
  public loadMore() {
    this.currentPage++;
    this.filmService.getMoviesByQuery(this.busqueda, this.currentPage).subscribe(
      (films: any) => {
        if (films.results) {
          this.filmList = [...this.filmList, ...films.results]
          this.showLoadMoreBtn = true;
          //No cargar mas peliculas si no recibe results
        } else {
          // this.showLoadMoreBtn=false
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }
}
