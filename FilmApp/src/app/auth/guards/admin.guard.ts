import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable, inject } from "@angular/core";
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

/**
   * Método canActivate para comprobar si el usuario tiene permisos de administrador antes de acceder a una ruta protegida.
   * @param route La ruta activada actualmente.
   * @param state El estado de la ruta actual.
   * @returns Promise<boolean> Promesa que indica si se permite o no la navegación.
   */
export class AdminGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isAuthenticated(state.url);

    if (!response) {
      // Si el usuario no tiene permisos de administrador, redirigirlo a la página de error 404 ('./404')
      this.router.navigate(['./404']);
    }
    return true;
  }
}
