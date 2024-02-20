import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API, URL_BASE } from 'src/environments/environment';
import { CommonService } from 'src/app/shared/validators/common.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

const ENDPOINT = 'usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  getAllUsuarios() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUser(user: User) {
    const body = JSON.stringify(user);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, {headers: this.commonService.headers });
  }

  editUsuario(user: User, route?: string) {
    const body = JSON.stringify(user);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteUsuario(user: User) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${user.id_usuario}`, { headers: this.commonService.headers });
  }

  removeUsuario(idUser : string) {
    this.users = this.users.filter(user => {
      return Number(user.id_usuario) !== Number(idUser);
    });
  }

  updateUsuario(user: User) {
    let index = null;
    this.users.filter((usuarioFilter, indexFilter) => {
      if (user.id_usuario === usuarioFilter.id_usuario) {
        index = indexFilter;
      }
    });

    if (index) {
      this.users[index] = user;
    }
  }

}
