import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/users.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService,
    private snackBar: MatSnackBar
) { }

ngOnInit() {
}

/**
 * Funcion que elimina un usuario, realizara una llamada al UserService.
 * Mostrará un snackbar con el resultado de la operación.
 */
async deleteUser() {
  const RESP = await this.userService
    .deleteUsuario(this.user)
    .toPromise();
  if (RESP && RESP.message) {
    if (RESP.ok) {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
    } else {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
    }
  }
}

/**
 * Método que cierra el dialogo sin eliminar el usuario.
 */
onNoClick() {
this.dialogRef.close({ok: false});
}
}
