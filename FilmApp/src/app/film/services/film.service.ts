import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { DataFilm, Film } from '../interfaces/film';
import { environment } from 'src/environments/environment';
import { Genre } from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  // Variables privadas para recoger la url de la api.
  private baseUrl: string = environment.BASE_URL
  private apiKey: string = environment.TOKEN

  constructor(private http: HttpClient) { }


  /**
   * Funcion que obtiene un array de Film[] basadas en los descubrimientos semanales.
   * @param page El número de página para obtener los resultados.
   * @returns Un Observable que emite un array de objetos Film.
   */
  getFilms(page: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}discover/movie?page=${page.toString()}${this.apiKey}`);
  }

  /**
   * Obtiene una lista de películas mejor valoradas.
   * @param page El número de página para obtener los resultados.
   * @returns Un Observable que emite un array de objetos Film.
   */
  getRatedFilms(page: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}movie/top_rated?page=${page.toString()}${this.apiKey}`);
  }

  /**
   * Realiza una busqueda en la api dependiendo de la idGenero y page que le pasemos por parametros.
   * Obtiene una lista de películas por género.
   * @param idGenero El ID del género.
   * @param page El número de página para obtener los resultados.
   * @returns Un Observable que emite un array de objetos Film.
   */
  getByGenre(idGenero: number, page: number): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.baseUrl}discover/movie?with_genres=${idGenero}&page=${page}${this.apiKey}`);
  }

  /**
   * Obtiene una lista de géneros de películas.
   * @returns Un Observable que emite un array de objetos Genre.
   */
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.baseUrl}genre/movie/list?&${this.apiKey}`);
  }

  /**
   * Realiza una búsqueda de películas por palabra clave.
   * @param busqueda La palabra clave de búsqueda.
   * @param page El número de página para obtener los resultados.
   * @returns Un Observable que emite un array de objetos Film.
   */
  getMoviesByQuery(busqueda: string, page: number): Observable<Film[]> {
    const busquedaTrim = busqueda.toLocaleLowerCase().trim();
    return this.http.get<Film[]>(`${this.baseUrl}search/movie?query=${busquedaTrim}&page=${page}${this.apiKey}`,
      environment.MOVIES_API_HEADERS
    );
  }

  /**
   * Obtiene los detalles de una película por su ID.
   * @param id El ID de la película.
   * @returns Un Observable que emite un objeto DataFilm o undefined si no se encuentra la película.
   */
  getFilmById(id: number | string): Observable<DataFilm | undefined> {
    return this.http.get<DataFilm | undefined>(`${this.baseUrl}movie/${id}${this.apiKey}`, environment.MOVIES_API_HEADERS).
      pipe(catchError(error => of(undefined)));
  }
}
