import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rol } from 'src/app/shared/interfaces/rol';
import { RolesService } from '../services/roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/users.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  usuarioForm!: FormGroup; // Formulario para editar usuario
  roles!: Rol[]; // Lista de roles disponibles

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private servicioRoles: RolesService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) { }

  /**
   * Método que se llama cuando se inicializa el componente.
   * Inicializa el formulario para editar un usuario existente.
   */
  ngOnInit() {
    // Inicialización del formulario
    this.usuarioForm = new FormGroup({
      id_usuario: new FormControl(this.user.id_usuario, [
        Validators.required,
      ]),
      usuario: new FormControl(this.user.usuario, [
        Validators.required,
        Validators.email,
      ]),
      nombre_publico: new FormControl(this.user.nombre_publico),
      password: new FormControl(''),
      habilitado: new FormControl(Number(this.user.habilitado) === 1, [
        Validators.required,
      ]),
      id_rol: new FormControl(this.user.id_rol, [Validators.required]),
      observaciones: new FormControl(this.user.observaciones),
    });

    this.getRoles();
  }

  /**
   * Método para obtener la lista de roles disponibles.
   * Llama al servicio para obtener los roles y maneja la respuesta.
   */
  async getRoles() {
    const RESPONSE = await this.servicioRoles.getAllRoles().toPromise();
    if (RESPONSE) {
      if (RESPONSE.ok) {
        this.roles = RESPONSE.data as Rol[];
      } else {
        // Manejar el caso en el que RESPONSE.ok es falso
        console.error(`Error al obtener roles: ${RESPONSE.message}`);
      }
    } else {
      // Manejar el caso en el que RESPONSE es undefined
      console.error('La respuesta de getAllRoles es undefined');
    }
  }


  /**
   * Método para confirmar la edición de usuario.
   * Verifica si el formulario es válido, envía la solicitud de edición al servicio y maneja la respuesta.
   */
  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      const RESP = await this.userService.editUsuario(usuario).toPromise();
      if (RESP && RESP.message) {
        if (RESP.ok) {
          this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
        } else {
          this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        }
      } else {
        // Manejar el caso en el que RESP es undefined
        console.error('La respuesta de editUsuario es undefined');
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  /**
   * Método para cerrar el cuadro de diálogo sin guardar los cambios de edicion.
   */
  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

}
