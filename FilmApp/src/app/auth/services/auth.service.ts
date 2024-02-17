import { environments } from 'src/environments/environments';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { User} from '../interfaces/user.interface';
import {catchError, map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.BASE_URL;
  private user?: User | undefined;

  get curretUser(): User | undefined {
    if ( !this.user ) return undefined;

    return structuredClone( this.user )
  }

  constructor( private http: HttpClient,
               private router: Router) { }

  login(): Observable<User> {
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap ( user => this.user = user),
        tap ( user => localStorage.setItem('token', user.id.toString()))
      );
  }



  get currentUser(): User | undefined{
    if(!this.user) return undefined;
    return structuredClone( this.user )
  }

  logout() : void{
    this.user = undefined
    localStorage.clear()
  }

  isLogged() : boolean {
    return !!this.user
  }

  checkAuthentication() : Observable<boolean> {
    if (!localStorage.getItem('token')) return of (false);

    const token = localStorage.getItem('token')

    return this.http.get<User>(`${ this.baseUrl}/users/1`)
    .pipe(
      tap( user => this.user = user),
      map( user => !!user),
      catchError ( err => of(false))
      )
  }


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

 }
