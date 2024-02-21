import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from "@angular/core";
import { Observable, map, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isLoged();
    if (response) {
      this.router.navigate(['/film']);
    }
    return true;
  }
}





// const checkLoged = (): Observable<boolean> => {
//   const authService: AuthService = inject(AuthService);
//   const router: Router = inject(Router);

//   return authService.isAuthenticated().pipe(
//     tap((areLoged) => {
//       if (areLoged) {
//         router.navigate(['/inicio']);
//       }
//     }),
//     map(() => true)
//   );
// };

// export const areLogedMatchGuard: CanMatchFn = (
//   router: Route,
//   segment: UrlSegment[]
// ) => {
//   return checkLoged();
// };

// export const areLogedActivatedGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   return checkLoged();
// };



// const checkAuthStatus = ():Observable<boolean> => {
//   const authService: AuthService = inject(AuthService);
//   const router: Router = inject(Router);

//   return authService.checkAuthentication()
//     .pipe(
//       tap( isAutheticated => console.log('AuthenticatedPublic:', isAutheticated)),
//       tap(
//         isAutheticated => {
//           if (isAutheticated){
//             router.navigate(['movies/home'])
//           }
//         }
//       ),
//       map(isAuthenticated => !isAuthenticated) // Return the opposite of what we got back
//     )
// }

// export const cantMatchGuard: CanMatchFn = (
//         route: Route,
//         segments: UrlSegment[]
//     ) => {
//         console.log('CanMatch');
//         console.log({route, segments});

//         return checkAuthStatus();
//     }

// export const cantActivateGuard: CanActivateFn = (
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot
//     ) => {
//         console.log('CanActivate');
//         console.log({route,state});

//         return checkAuthStatus();
//     }
