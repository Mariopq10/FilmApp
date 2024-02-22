import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from "@angular/core";
import { Observable, map, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
//Guard que comprueba si el usuario esta logado, en caso afirmativo no podrá volver a la ruta selecionada en el routing.
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
