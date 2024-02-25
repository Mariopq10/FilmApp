import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../services/roles.service';
import { UserService} from '../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from 'src/app/shared/interfaces/rol';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  usuarioForm!: FormGroup;
  roles!: Rol[];

  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              private servicioRoles: RolesService,
              private userService: UserService,
              public snackBar: MatSnackBar
  ) { }

  /**
   * Iniciamos el componente y inicializamos el formulario para añadir un usuario.
   */
  ngOnInit() {
    this.usuarioForm = new FormGroup({
      usuario: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      id_rol: new FormControl(null, [Validators.required]),
      nombre_publico: new FormControl(null),
      observaciones: new FormControl(null)
    });

    this.getRoles();
  }

  /**
   * Funcion asincrona donde se obtiene todos los roles disponibles.
   */
  async getRoles() {
    const RESPONSE = await this.servicioRoles.getAllRoles().toPromise();
    if (RESPONSE && RESPONSE.ok && RESPONSE.data) {
      this.roles = RESPONSE.data as Rol[];
    }
  }

  /**
   * Método para confirmar el insert de un usuario.
   * Si el formulario es válido, agrega el usuario utilizando el servicio UserService.
   * En caso de error muestra el mensaje en un snackbar.
   */
  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      const RESP = await this.userService.addUser(usuario).toPromise();
      if (RESP && RESP.message) {
        if (RESP.ok) {
          this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
        } else {
          this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        }
      } else {
        this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
      }
    }
  }

  /**
   * Método para cerrar el diálogo sin agregar el usuario.
   */
  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }


}
