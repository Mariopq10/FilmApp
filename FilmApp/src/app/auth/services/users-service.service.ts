import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/shared/validators/common.service';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';
import { URL_API } from 'src/environments/environment';


const ENDPOINT = 'usuario'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user!: User;
  users: User[] = [];
  currentUser!: User | undefined;
  arrayIdsMovies: string[] | number[] = [];

  constructor(private http: HttpClient,private commonService: CommonService) {}

  async setUserByToken() {
      let token = localStorage.getItem('token');
    try {
      if (token) {
        const response = await this.getUserByToken(token).toPromise();
        if (response?.ok && response.data) {
          this.currentUser = response.data as User;
        } else {
          // Manejar el caso en que no se pueda obtener el usuario por el token
          console.error('No se pudo obtener el usuario por el token.');
        }
      } else {
        // Manejar el caso en que el token sea nulo
        console.error('El token es nulo.');
      }
    } catch (error) {
      console.error('Error al obtener el usuario por el token:', error);
    }
}

  // Método para obtener todos los usuarios
  getUsers() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php` , { headers: this.commonService.headers });
  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<ApiResponse>(`${URL_API}/usuario.php`, body, { headers: this.commonService.headers });
  }

  editUser(user: User,  route?: string) {
    const body = JSON.stringify(user);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteUser(id_usuario: number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_usuario=${id_usuario}`, { headers: this.commonService.headers });
  }

  getUserByToken(token_sesion: string | null) {
    const body = JSON.stringify({ token_sesion: token_sesion });
    let encodedToken = "";
    if (token_sesion !== null) {
      encodedToken = encodeURIComponent(token_sesion);
    }
    // console.log(token_sesion);
    // console.log(body);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php?token_sesion=${encodedToken}`, body, { headers: this.commonService.headers });
  }
}

