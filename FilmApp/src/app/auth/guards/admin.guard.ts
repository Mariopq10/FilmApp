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

  constructor(public auth: AuthService, public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isAuthenticated(state.url);

    if (!response) {
      this.router.navigate(['./404']);
    }
    return true;
  }
  }
