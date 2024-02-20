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
  ) {}

  ngOnInit() {
    this.getusers();
  }

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
