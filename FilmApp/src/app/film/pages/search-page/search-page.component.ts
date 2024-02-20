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
  public filmList: Film[] = [];
  public searchForm: FormGroup;

  // Variable para almacenar el número de página actual
  public currentPage: number = 1;
  // Variable de bandera para mostrar u ocultar el botón
  public showLoadMoreBtn: boolean = false;

  constructor(
    public filmService: FilmService,
    private elementRef: ElementRef
  ) {
    this.searchForm = new FormGroup({
      searchInput: new FormControl('')
    });
  }

  ngOnInit(): void { }

  //Se almacena el valor que recoge el formulario en una const finder y llamamos a la funcion loadFilms() para cargar las peliculas
  public search() {
    const finder = this.searchForm.get('searchInput')!.value;
    if (!finder.trim()) {
      return;
    }
    this.currentPage = 1;
    this.loadFilms();
  }


  //Funcion que realiza la carga de las peliculas llamando al servicio y realizando subscribe sobre el array de Film[]
  private loadFilms() {
    const busqueda = this.searchForm.get('searchInput')!.value;
    this.filmService.getMoviesByQuery(busqueda, this.currentPage).subscribe(
      (films: any) => {
        if (films.results) {
          this.filmList = [...this.filmList, ...films.results]
          this.showLoadMoreBtn = true;
          //No cargar mas peliculas si no recibe results
        } else {
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }

  //Funcion que modifica el valor de la página actual para realizar una busqueda en la siguiente page
  public loadMore() {
    this.currentPage++;
    this.loadFilms();
  }

  //Funcion que redondea el valor de la variable vote_average de la interfaz film
  getPercentageRating(voteAverage: number): string {
    const percentage = Math.round(voteAverage * 10); // Redondear al entero más cercano
    return percentage.toString(); // Convertir a cadena y agregar el símbolo de porcentaje
  }
}

