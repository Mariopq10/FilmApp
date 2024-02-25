import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/shared/interfaces/rol';
import { CommonService } from 'src/app/shared/validators/common.service';
import { ApiResponse } from 'src/app/shared/interfaces/api-response';

// Nombre del archivo del backend para realizar las consultas.
const ENDPOINT = 'rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roles!: Rol[];

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  /**
   * Obtiene todos los roles disponibles.
   * @returns Un observable que emite una respuesta de la API que contiene los roles.
   */
  getAllRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  /**
   * Agrega un nuevo rol.
   * @param rol El rol a agregar.
   * @returns Un observable que emite una respuesta de la API que indica el resultado de la operación.
   */
  addRol(rol: Rol) {
    const body = JSON.stringify(rol);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  /**
   * Edita un rol existente.
   * @param rol El rol actualizado.
   * @returns Un observable que emite una respuesta de la API que indica el resultado de la operación.
   */
  editRol(rol: Rol) {
    const body = JSON.stringify(rol);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  /**
   * Elimina un rol existente.
   * @param idRol El ID del rol a eliminar.
   * @returns Un observable que emite una respuesta de la API que indica el resultado de la operación.
   */
  deleteRol(idRol: string | number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idRol}`, { headers: this.commonService.headers });
  }

   /**
   * Elimina un rol del arreglo de roles.
   * @param idRol El ID del rol a eliminar.
   */
  removeRol(idRol : string) {
    this.roles = this.roles.filter(rol => {
      return Number(rol.id_rol) !== Number(idRol);
    });
  }

  /**
   * Actualiza un rol en el arreglo de roles.
   * @param rol El rol actualizado.
   */
  updateRol(rol: Rol) {
    let index = null;
    this.roles.filter((rolFilter, indexFilter) => {
      if (rol.id_rol === rolFilter.id_rol) {
        index = indexFilter;
      }
    });

    if (index) {
      this.roles[index] = rol;
    }
  }
}
