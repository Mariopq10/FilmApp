import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/film/interfaces/genre';
import { FilmService } from 'src/app/film/services/film.service';
import { Film } from '../../interfaces/film';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})


export class GenreComponent implements OnInit {
  filmArray: Film[] = []; // Array para almacenar las películas del género seleccionado
  genres: Genre[] = []; // Array para almacenar los géneros de películas disponibles
  currentGenre: number = 0; // ID del genero actualmente seleccionado
  currentPage: number = 1; // Numero de página actual para la carga de pelicula

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    // Obtener los generos de peliculas disponibles al inicializar el componente
    this.filmService.getGenres().subscribe((genre: any) => { this.genres = genre.genres; console.log(genre) })
  }


  /**
   * Metodo para obtener las películas de un género específico.
   * @param genreId El ID del genero de películas.
   * @param currentPage El número de página actual.
   */
  getByGenre(genreId: number, currentPage: number) {
    // Verificar si ya se estan mostrando peliculas del mismo genero en la misma pagina
    if (genreId == this.currentGenre) {
      this.filmService.getByGenre(genreId, currentPage).subscribe((films: any) => {
        this.filmArray = [...this.filmArray, ...films.results]
        console.log(this.filmArray)
        console.log(currentPage)
      });
    } else {
      this.currentGenre = genreId
      this.currentPage = 1
      this.filmService.getByGenre(genreId, this.currentPage).subscribe((films: any) => {
        this.filmArray = films.results
      });
    }
  }

  /**
   * Metodo para cargar mas peliculas del genero seleccionado.
   */
  loadMore() {
    this.currentPage++;
    this.getByGenre(this.currentGenre, this.currentPage);
  }
}
