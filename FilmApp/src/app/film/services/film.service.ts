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


  private baseUrl : string = environment.BASE_URL
  private apiKey : string = environment.TOKEN


constructor(private http : HttpClient) { }


// Novedades Descubrimientos
getFilms(page: number): Observable<Film[]> {
  return this.http.get<Film[]>(`${this.baseUrl}discover/movie?page=${page.toString()}${this.apiKey}`);
}

// Top Rated
getRatedFilms(page: number): Observable<Film[]> {
  return this.http.get<Film[]>(`${this.baseUrl}movie/top_rated?page=${page.toString()}${this.apiKey}`);
}


//Probar quitar el page
getByGenre(idGenero : number): Observable<Film[]> {
  return this.http.get<Film[]>(`${this.baseUrl}discover/movie?with_genres=${idGenero}${this.apiKey}`);
}

//Funcion que devuelve los Generos
getGenres(): Observable<Genre[]>{
  return this.http.get<Genre[]>(`${this.baseUrl}genre/movie/list?&${this.apiKey}`);
}


//Funcion que devuelve una pelicula dependiendo del id
getFilmById(id: number | string): Observable<DataFilm | undefined> {
  if ( !id){
    return of (undefined)
  }
  return this.http.get<DataFilm>(`${this.baseUrl}movie/${id}${this.apiKey}`, environment.MOVIES_API_HEADERS).
    pipe(catchError(error => of(undefined)));
}







// getSuggestions(query: String): Observable<Film[]> {
//   return this.http.get<Film[]>(`${this.baseUrl}/film?q=${query}&_limit=6`)
// }

// addHero(film: Film): Observable<Film> {
//   return this.http.post<Film>(`${this.baseUrl}/film`, film)
// }
// updateHero(film: Film): Observable<Film> {
//   return this.http.patch<film>(`${this.baseUrl}/film/${hero.id}`, hero)
// }
// deleteHeroById(id: string): Observable<boolean> {
//   return this.http.delete<Film>(`${this.baseUrl}/film/${id}`).pipe(
//     map(response => true),
//     catchError(error => of(false))
//   )

}
