import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable, inject } from "@angular/core";
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
//Guard que comprueba si el usuario esta autenticado, en caso negativo, no podrá acceder a la aplicación.
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isAuthenticated(state.url);

    if (!response) {
      this.router.navigate(['auth/login']);
    }
    return true;
  }
}
