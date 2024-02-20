import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { UsuariosRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,MaterialModule, UsuariosRoutingModule
  ],
  declarations: [UsersComponent,AddUserComponent,EditUserComponent,DeleteUserComponent]
})
export class UsersModule { }
