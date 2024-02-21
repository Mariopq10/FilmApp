import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable, inject } from "@angular/core";
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


//Guard para comprobacion si usuario es o no un SuperAdmin
export class AdminGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (this.authService.isUserAdmin()) {
      return true; // Permitir el acceso si el usuario es administrador
    } else {
      this.router.navigate(['/']); // Redirigir a la página principal si el usuario no es administrador
      return false;
    }
  }
  }
