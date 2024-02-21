import { URL_API } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { User} from '../interfaces/user.interface';
import {catchError, map, tap} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { URL_BASE } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { CommonService } from 'src/app/shared/validators/common.service';
import { UserService } from '../../users/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: User | undefined;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private commonService: CommonService,
    private userService: UserService,
    private httpClient: HttpClient
    ) { }

  doLogin(data: any) {
    const body = JSON.stringify(data);
    return this.http.post<ApiResponse>(`${URL_API}/login.php`, body);
  }

  getCurrentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    return structuredClone(this.user)
  }

  checkAuthentication(): Observable<boolean> {
    // Si no hay token se devuelve false
    if (!localStorage.getItem('token')) return of(false);

    const TOKEN = localStorage.getItem('token');

    return this.httpClient.get<User>(`${URL_API}/usuario.php`)
        .pipe(
            tap ( user => this.user = user), // almacenamos el usuario en la propiedad
            map ( user => !!user ), // es lo mismo que "map ( user => user? true : false)", si hay user se devuelve true, sino false
            catchError ( err => of(false))
        )
}

public async isAuthenticated(url: string): Promise<boolean> {
  let rutaSeleccionada: string;
  const promise = new Promise<boolean>((resolve, reject) => {

    rutaSeleccionada = url.substring(1);
    rutaSeleccionada = rutaSeleccionada.split('/')[0];

    this.http.get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=${rutaSeleccionada}`, { headers: this.commonService.getHeaders() })
      .subscribe((response: ApiResponse) => {
        console.log(response)
        resolve(response.ok);
      });
  });
  return promise;
}

public async isLoged(): Promise<boolean> {
  const promise = new Promise<boolean>((resolve, reject) => {
    this.http.get<ApiResponse>(`${URL_API}/check_usuarios.php?ruta=inicio`, { headers: this.commonService.getHeaders() })
      .subscribe((response: ApiResponse) => {
        console.log(response)
        resolve(response.ok);
      });
  });
  return promise;
}

doLogout() {
  const body = new FormData();
  const usuario = localStorage.getItem('usuario');
  if (usuario !== null) {
    body.append('user', usuario);
  } else {
    // Tratar el caso en que usuario sea null
    console.error('El usuario no está definido en el localStorage.');
    return;
  }
  // this.usersService.currentUser = undefined
  this.cookieService.deleteAll();
  localStorage.clear();

  return this.http.post(`${URL_API}/logout.php`, body);
}

  // resetPassword(formularioCorreo) {
  //   const body = JSON.stringify(formularioCorreo);
  //   return this.http.post<ApiResponse>(`${URL_API}/olvidar_pwd.php`, body, {headers: this.commonService.headers});
  // }

  checkPassToken(tokenPasswd: string) {
    const body = JSON.stringify({ token: tokenPasswd });
    return this.http.post<ApiResponse>(`${URL_API}/check_token_passwd.php`, body);
  }

  // generateNewPass(data: any) {
  //   const body = JSON.stringify(data);

  //   return this.http.put<ApiResponse>(`${URL_API}/reset_pass.php`, body);

  // }

checkAdminRole(): Promise<boolean>{
  return new Promise((resolve,reject)=>{
    const user = this.getCurrentUser();
    console.log(user)
    if (user && user.id_rol=='1'){
      resolve(true);
    }else{
      resolve(false)
    }
    console.log(resolve)
  })
}

//Comprobaciones para AdminGuard, recogemos la id_rol del usuario actual.
getUser(): Observable<User | undefined> {
  console.log(structuredClone(' ????'))
  console.log(this.user)
  if (this.user) {
    return of(structuredClone(this.user));
  } else {
    // Si el usuario no está disponible, puedes devolver un observable vacío o un observable de 'undefined'
    return of(undefined);
  }
}
isUserAdmin(): Observable<boolean> {
  return this.getUser().pipe(
    map(user2 => !!user2 && user2.id_rol == '1') ,
    catchError(() => of(false)) // Manejar cualquier error devolviendo false
  );
}
}














































  // get curretUser(): User | undefined {
  //   if ( !this.user ) return undefined;

  //   return structuredClone( this.user )
  // }

  // constructor( private http: HttpClient,
  //              private router: Router) { }

  // login(): Observable<User> {
  //   return this.http.get<User>(`${ this.baseUrl }/users/1`)
  //     .pipe(
  //       tap ( user => this.user = user),
  //       tap ( user => localStorage.setItem('token', user.id.toString()))
  //     );
  // }



  // get currentUser(): User | undefined{
  //   if(!this.user) return undefined;
  //   return structuredClone( this.user )
  // }

  // logout() : void{
  //   this.user = undefined
  //   localStorage.clear()
  // }

  // isLogged() : boolean {
  //   return !!this.user
  // }

  // checkAuthentication() : Observable<boolean> {
  //   if (!localStorage.getItem('token')) return of (false);

  //   const token = localStorage.getItem('token')

  //   return this.http.get<User>(`${ this.baseUrl}/users/1`)
  //   .pipe(
  //     tap( user => this.user = user),
  //     map( user => !!user),
  //     catchError ( err => of(false))
  //     )
  // }


  // logout(): void {
  //   this.user = undefined;
  //   localStorage.removeItem('token');
  //   this.router.navigate(['./auth/login']);
  // }

//   verificaAutenticacion(): Observable<boolean>{

//     if ( !localStorage.getItem('token' )){
//       return of (false);
//     }

//     return this.http.get<User>(`${ this.baseUrl }/users/1`).pipe(
//       map( user => {
//         console.log('map', user);
//         this.user = user;
//         return true;
//       })
//     );
//   }

