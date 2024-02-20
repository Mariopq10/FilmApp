import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable, inject } from "@angular/core";
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isAuthenticated(state.url);

    if (!response) {
      this.router.navigate(['auth/login']);
    }
    return response;
  }
}











// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) { }

//   async canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Promise<boolean> {
//     const url = state.url; // Get the URL from the router state
//     const isAuthenticated = await this.authService.isAuthenticated(url);
//     if (isAuthenticated) {
//       return true;
//     } else {
//       // If the user is not authenticated, redirect to the login page
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }






// const checkAuthStatus = (): Observable<boolean> => {
//   const authService : AuthService = inject(AuthService)
//   const router: Router = inject(Router);

//   return authService.checkAuthentication()
//   .pipe(
//     tap( isAuthenticated =>{
//       if(!isAuthenticated){
//         router.navigate(['/auth/login'])
//       }
//     })
//   )
// }


// export const canMatchGuard: CanMatchFn =(
//   route : Route,
//   segments : UrlSegment[]
// ) => {
//   console.log('CanMatch')
//   console.log( route , segments)
//   return checkAuthStatus();
// }



// export const canActivateGuard:  CanActivateFn = (
// route : ActivatedRouteSnapshot,
// state : RouterStateSnapshot
// ) => {
//   console.log('CanActivate')
//   console.log({route, state})

//   return checkAuthStatus();
// }


// export class AuthGuardService implements CanActivate {

//   constructor(public auth: AuthService, public router: Router) {}


//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

//     const response = await this.auth.isAuthenticated(state.url);

//     if (!response) {
//       this.router.navigate(['/film']);
//     }

//     return response;
//   }

// }
