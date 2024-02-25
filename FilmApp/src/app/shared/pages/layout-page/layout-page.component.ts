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

  nombre_usuario: string | null; //Nombre de usuario logado.
  id_rol: string | null; // Id del usuario logado.

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.nombre_usuario = localStorage.getItem("nombre_publico");
    this.id_rol = localStorage.getItem("id_rol");
  }

  /**
   * Método para realizar el logout, llama al servicio y redirecciona al auth/login.
   */
  onLogout(): void {
    this.authService.doLogout()
    this.router.navigate(['/auth/login'])
  }

   /**
   * Método que obtiene el usuario actualmente autenticado, llama al servicio y obtiene el usuario.
   * @returns El usuario actual.
   */
  get user(): User | undefined {
    return this.authService.getCurrentUser()
  }

  /**
   * Verifica si el usuario actual es administrador.
   * @returns True si el usuario es administrador, de lo contrario devolverá False.
   */
  isUserAdmin(): boolean {
    if (this.id_rol == '1') {
      return true
    } else {
      return false
    }
  }
}

