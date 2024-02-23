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

  setUser(user: User) {
    this.user = user;
  }


  getFavs(id_usuario: string  | null) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}` , { headers: this.commonService.headers });
  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editUser(user: User,  route?: string) {
    const body = JSON.stringify(user);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }
  addFav(id_usuario: string | null , id_pelicula: string| null) {
    const body = JSON.stringify({ id_usuario: id_usuario, id_pelicula: id_pelicula });
    console.log(body)
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}&id_pelicula=${id_pelicula}`, body, { headers: this.commonService.headers });
  }

  deleteFav(id_usuario: number , id_pelicula : number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}&id_pelicula=${id_pelicula}`, { headers: this.commonService.headers });
  }

  insertarFav(id_usuario: string | null , id_pelicula: string| null) {
    const body = JSON.stringify({ id_usuario: id_usuario, id_pelicula: id_pelicula });
    console.log(body)
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });

  }

  async getIdsFavoritas(id_usuario: string) {
    const RESPONSE = await this.getFavs(id_usuario).toPromise();
    if (RESPONSE !== undefined && RESPONSE.permises !== undefined && RESPONSE.ok) {
      this.idFilmList = RESPONSE.data.map((item: { id_pelicula: any }) => item.id_pelicula);
    }
}
}
