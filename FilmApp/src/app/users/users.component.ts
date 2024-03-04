import { Component, OnInit, ViewChild } from '@angular/core';
import { Permises } from '../shared/interfaces/api-response';
import { User } from '../auth/interfaces/user.interface';
import { UserService } from './services/users.service';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  permises: Permises = {
    add: false,
    edit: false,
    delete: false,
  };

  idFilter = new FormControl();
  usuarioFilter = new FormControl();
  nombreFilter = new FormControl();
  rolFilter = new FormControl();

  displayTable = false;

  displayedColumns: string[] = [];
  private filterValues = {
    id_usuario: '',
    usuario: '',
    nombre_publico: '',
    rol: '',
    habilitado: 0,
  };

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.getusers();
  }

  /**
   * Metodo asincrono que obtiene la lista de usuarios desde el servicio userService
   * Actualiza la interfaz con los usuarios obtenidos.
   */
  async getusers() {
    const RESPONSE = await this.userService.getAllUsuarios().toPromise();

    if (RESPONSE && RESPONSE.permises) {
      this.permises = RESPONSE.permises;

      if (RESPONSE.ok) {
        this.displayedColumns = [
          'id_usuario',
          'usuario',
          'nombre_publico',
          'rol',
          'habilitado',
          'actions',
        ];
        this.userService.users = RESPONSE.data as User[];
        this.dataSource.data = this.userService.users;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.createFilter();
        this.onChanges();
      }
    }
  }

  /**
   * Metodo asincrono para agregar un nuevo usuario, este metodo lanzara una nueva ventana en la cual ingresaremos los datos del nuevo usuario.
   * En caso de que RESP sea correcta, hara un push en el array de users con los datos de la respuesta.
   */
  async addUsuario() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.userService.users.push(RESP.data);
        this.dataSource.data = this.userService.users;
      }
    }
  }

  /**
   * Metodo asincrono para editar un usuario existente.
   * Lanza una ventana para editar los datos del usuario seleccionado.
   * En caso de que RESP sea correcta, hara un update del usuario con los datos de la respuesta.
   * @param user El usuario que se va a editar.
   */
  async editUsuario(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
      width: '500px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.userService.updateUsuario(RESP.data);
        this.dataSource.data = this.userService.users;
      }
    }
  }

  /**
   * Metodo asincrono para eliminar un usuario existente.
   * Lanza una ventana para confirmar la eliminación del usuario seleccionado.
   * En caso de que RESP sea valido, se llama a removeUsuario
   * @param user El usuario que se va a eliminar.
   */
  async deleteUsuario(user: User) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const RESP = await dialogRef.afterClosed().toPromise();
    if (RESP) {
      if (RESP.ok) {
        this.userService.removeUsuario(RESP.data);
        this.dataSource.data = this.userService.users;
      }
    }
  }

  /**
   * Metodo para crear un filtro de filtro personalizado para la tabla de usuarios.
   * @returns Una función que evalúa si un usuario cumple con los términos de búsqueda especificados.
   * NO SE USA
   */
  createFilter(): (usuario: any, filter: string) => boolean {
    const filterFunction = (usuario: any, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return usuario.id_usuario
        .toString()
        .indexOf(searchTerms.id_usuario.toLowerCase()) !== -1 &&
        usuario.usuario
          .toLowerCase()
          .indexOf(searchTerms.usuario.toLowerCase()) !== -1 &&
        usuario.nombre_publico
          .toLowerCase()
          .indexOf(searchTerms.nombre_publico.toLowerCase()) !== -1 &&
        usuario.rol.toLowerCase().indexOf(searchTerms.rol.toLowerCase()) !==
        -1 &&
        searchTerms.habilitado === 'todos'
        ? usuario.habilitado
        : usuario.habilitado.indexOf(searchTerms.habilitado) !== -1;
    };

    return filterFunction;
  }

  /**
   * MEtodo para establecer suscripciones a los cambios en los filtros de busqueda.
   * Actualiza los valores de filtro y aplica el filtro a la fuente de datos de la tabla cuando cambia el valor de un filtro.
   */
  onChanges(): void {
    this.idFilter.valueChanges.subscribe((value) => {
      this.filterValues.id_usuario = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.usuarioFilter.valueChanges.subscribe((value) => {
      this.filterValues.usuario = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nombreFilter.valueChanges.subscribe((value) => {
      this.filterValues.nombre_publico = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.rolFilter.valueChanges.subscribe((value) => {
      this.filterValues.rol = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

/**
 * Metodo para buscar usuarios según su estado
 * @param event El evento que desencadena la búsqueda, contiene el valor seleccionado para el estado.
 */
  buscarHabilitados(event: any) {
    let value: number;

    event.value === 'todos'
      ? (value = event.value)
      : (value = Number(event.value));
    this.filterValues.habilitado = value;
    // console.log(value);
    this.dataSource.filter = JSON.stringify(this.filterValues);
    // this.dataSource.data = this.dataSource.filteredData.filter(filas=> filas.habilitado == event.value)
  }
}
