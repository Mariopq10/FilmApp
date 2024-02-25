import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Film } from '../interfaces/film';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/validators/common.service';
import { UserService } from 'src/app/users/services/users.service';
import { FilmService } from './film.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';
import { URL_API } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';

const ENDPOINT = 'fav';


@Injectable({
  providedIn: 'root'
})
export class FavService {
  user!: User;
  users: User[] = [];
  currentUser!: User;

  idFilmList: string[] | number[] = [];
  favList: Film[] = [];

  constructor(private http: HttpClient,
              private commonService: CommonService,
              private userService: UserService,
              private filmService: FilmService,
              private authService : AuthService,
              ) { }

/**
   * Metodo que obtiene las películas favoritas de un usuario.
   * @param id_usuario El ID del usuario del que se obtienen las películas favoritas.
   * @returns Un Observable que emite una ApiResponse con las películas favoritas.
   */
  getFavs(id_usuario: string  | null) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}` , { headers: this.commonService.getHeaders() });
  }

  /**
   * Metodo que añade una película a la lista de favoritos de un usuario.
   * @param id_usuario El ID del usuario al que se añade la película como favorita.
   * @param id_pelicula El ID de la película que se añade como favorita.
   * @returns Un Observable que emite una ApiResponse.
   */
  addFav(id_usuario: string | null , id_pelicula: string| null) {
    console.log(this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`,  { headers: this.commonService.headers }))
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}&id_pelicula=${id_pelicula}`, { headers: this.commonService.getHeaders() });
  }

  /**
   * Metodo que elimina una película de la lista de favoritos de un usuario.
   * @param id_usuario El ID del usuario del que se elimina la película favorita.
   * @param id_pelicula El ID de la película que se elimina de la lista de favoritos.
   * @returns Un Observable que emite una ApiResponse.
   */
  deleteFav(id_usuario: string |null , id_pelicula : string | null) {
    return this.http.delete<ApiResponse>(`${URL_API}/fav.php?id_usuario=${id_usuario}&id_pelicula=${id_pelicula}`, { headers: this.commonService.headers });
  }

  /**
   * Metodo que inserta una película como favorita para un usuario en el backend.
   * @param id_usuario El ID del usuario al que se añade la película como favorita.
   * @param id_pelicula El ID de la película que se añade como favorita.
   * @returns Un Observable que emite una ApiResponse.
   */
  insertarFav(id_usuario: string | null , id_pelicula: string| null) {
    const body = JSON.stringify({ id_usuario: id_usuario, id_pelicula: id_pelicula });
    console.log(body)

    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  /**
   * Funcion asincrona que obtiene los IDs de las películas favoritas de un usuario y las almacena en idFilmList[]
   * @param id_usuario El ID del usuario del que se obtienen las películas favoritas.
   */
  async getIdsFavoritas(id_usuario: string) {
    const RESPONSE = await this.getFavs(id_usuario).toPromise();
    if (RESPONSE !== undefined && RESPONSE.permises !== undefined && RESPONSE.ok) {
      this.idFilmList = RESPONSE.data.map((item: { id_pelicula: any }) => item.id_pelicula);
    }
}
}
