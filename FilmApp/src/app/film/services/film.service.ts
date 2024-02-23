import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { DataFilm, Film } from '../interfaces/film';
import { environment } from 'src/environments/environment';
import { Genre } from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})

//Clase FilmService que recoge todas las funciones relacionadas con la API de TMDB
export class FilmService {

  private baseUrl: string = environment.BASE_URL
  private apiKey: string = environment.TOKEN

  constructor(private http: HttpClient) { }


  // Funcion que devuelve un array de Film[] basado en los descubrimientos semanales.
  getFilms(page: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}discover/movie?page=${page.toString()}${this.apiKey}`);
  }

  // Funcion que devuelve un Film[] de las peliculas mejor valoradas.
  getRatedFilms(page: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}movie/top_rated?page=${page.toString()}${this.apiKey}`);
  }


  //Funcion que realiza una busqueda en la api dependiendo de la idGenero y page que le pasemos por parametros.
  getByGenre(idGenero: number, page: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}discover/movie?with_genres=${idGenero}&page=${page}${this.apiKey}`);
  }

  //Funcion que devuelve el id y nombre de cada genero y lo almacena en un array.
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.baseUrl}genre/movie/list?&${this.apiKey}`);
  }

  // Funcion que devuelve un array de Film el cual le pasamos una busqueda por parametros, esa busqueda será una palabra asociada al titulo de una pelicula
  getMoviesByQuery(busqueda: string, page: number): Observable<Film[]> {
    const busquedaTrim = busqueda.toLocaleLowerCase().trim();
    return this.http.get<Film[]>(`${this.baseUrl}search/movie?query=${busquedaTrim}&page=${page}${this.apiKey}`,
      environment.MOVIES_API_HEADERS
    );
  }

  //Funcion que devuelve los datos asociados a una pelicula, en este caso a un objeto DataFilm
  getFilmById(id: number | string): Observable<DataFilm | undefined> {
    // if (!id) {
    //   return of(undefined)
    // }
    return this.http.get<DataFilm | undefined>(`${this.baseUrl}movie/${id}${this.apiKey}`, environment.MOVIES_API_HEADERS).
      pipe(catchError(error => of(undefined)));
  }




}
