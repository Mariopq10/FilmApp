import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Top Rated', icon: 'flash_on', url: '/film/list' },
    { label: 'List by Genres', icon: 'subject', url: '/film/genre' },
    { label: 'Users', icon: 'supervisor_account', url: '/users' },
    { label: 'Find', icon: 'search', url: '/film/search' },
  ]
  nombre_usuario: string | null;
  id_rol: string | null;

  constructor(
    private authService : AuthService,
    private router : Router){
      this.nombre_usuario = localStorage.getItem("nombre_publico") ;
      this.id_rol = localStorage.getItem("id_rol") ;
    }


    onClick() : void {
      this.authService
    }

    onLogout() : void {
      this.authService.doLogout()
      this.router.navigate(['/auth/login'])
    }

    get user() : User | undefined{
      return this.authService.getCurrentUser()
    }

    isUserAdmin():boolean {
      if(this.id_rol=='1'){
        return true
      }else{
        return false
      }
    }
  }

