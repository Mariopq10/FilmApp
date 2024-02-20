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
export class LoginPageComponent {

  @Output() valueChange = new EventEmitter();

  loginForm!: FormGroup;
  titulo = 'LOG IN';
  alerta!: string;
  showSpinner!: boolean;
  error!: string;
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

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async acceder() {
    if (this.loginForm.valid) {
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
            this.commonService.headers = new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESPONSE.data.token}`
            });
            console.log(localStorage['nombre_publico']);
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

  forgotPassword() {
    this.valueChange.emit(true);
  }

  onUsernameEnter() {
    this.usernameEntered = true;
    setTimeout(() => {
      this.passwordInput.nativeElement.focus();
    }, 0);
  }
}
