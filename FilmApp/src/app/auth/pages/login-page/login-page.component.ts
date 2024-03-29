import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/shared/validators/common.service';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'
  ]
})

// Componente LoginPageComponent para controlar el acceso de usuarios.
// Controlará los input recibidos del html y realizará consultas al backend con esos datos.
// En caso de error mostrará por pantalla un snackbar
export class LoginPageComponent {

  @Output() valueChange = new EventEmitter();

  loginForm!: FormGroup;
  usernameEntered = false;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private commonService: CommonService,
    private fb: FormBuilder
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario de inicio de sesión.
   */
  ngOnInit() {
    this.setForm();
  }

  /**
   * Funcion que inicializa el formulario de validacion del usuario y contraseña
   * Comprueba que la estructura del email sea valido.
   */
  setForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', Validators.required]
    });
  }


  /**
   * Funcion que se ejecuta al pulsar el boton check email, realiza una comprobacion para saber si el email introducido es valido.
   * Modifica el valor de la variable usernameEntered.
   */
  checkEmailValidity() {
    const usernameControl = this.loginForm.get('username');
    if (usernameControl?.valid) {
      setTimeout(() => {
        this.usernameEntered = true;
      }, 3000); // Espera 3 segundos antes de mostrar el campo de contraseña
    } else {
      this.usernameEntered = false;
    }
  }

   /**
   * Función para iniciar sesión.
   * Comprueba la validez del formulario, envía los datos al servicio de autenticación y gestiona la respuesta.
   * Si recibe respuesta, recogerá los datos de la consulta y las pasará al localStorage.
   */
  async acceder() {
    if (this.loginForm.valid && this.usernameEntered) {
      const data = this.loginForm.value;
      const RESPONSE = await this.authService.doLogin(data).toPromise();

      if (RESPONSE) {
        if (RESPONSE.ok) {
          if (RESPONSE.data.token) {
            localStorage.setItem('token', RESPONSE.data.token);
            localStorage.setItem('usuario', RESPONSE.data.usuario);
            localStorage.setItem('nombre_publico', RESPONSE.data.nombre_publico);
            localStorage.setItem('ultimaOpcion', RESPONSE.data.opcion);
            localStorage.setItem('ultimoGrupo', RESPONSE.data.grupo);
            localStorage.setItem('id_rol', RESPONSE.data.id_rol);
            localStorage.setItem('id_usuario', RESPONSE.data.id_usuario);
            // Establecer los headers para las solicitudes HTTP
            this.commonService.headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESPONSE.data.token}`
            });
            console.log(localStorage['nombre_publico']);
            // Redireccionar a la página de películas
            this.router.navigate([`/film/`]);
          } else if (RESPONSE.data.valido === 0) {
            this.snackBar.open('Usuario inhabilitado', 'Cerrar', { duration: 5000 });
          } else if (RESPONSE.data.valido === 1) {
            this.snackBar.open('Usuario o contraseña incorrectas', 'Cerrar', { duration: 5000 });
          }
        }
      }
    }
  }
}
