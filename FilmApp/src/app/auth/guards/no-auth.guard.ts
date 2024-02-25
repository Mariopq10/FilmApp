import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from "@angular/core";
import { Observable, map, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})

/**
   * Método canActivate para comprobar si el usuario está logueado.
   * @param route La ruta activada actualmente.
   * @param state El estado de la ruta actual.
   * @returns Promise<boolean> Promesa que indica si se permite o no la navegación.
   */
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
