import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MaterialComponentsModule } from '../shared/material-components.module';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsAddComponent } from './products/products-add/products-add.component';
import { ParameterTypesListComponent } from './parameter-types/parameter-types-list/parameter-types-list.component';
import { ParameterTypesAddComponent } from './parameter-types/parameter-types-add/parameter-types-add.component';
import { ParametersAddComponent } from './parameters/parameters-add/parameters-add.component';
import { ParametersListComponent } from './parameters/parameters-list/parameters-list.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialComponentsModule
  ],
  declarations: [HomeComponent, AdminLoginComponent, AdminPageComponent,
    AdminHeaderComponent, AdminSidenavComponent, UsersListComponent, UsersAddComponent, ProductsListComponent, ProductsAddComponent, ParameterTypesListComponent, ParameterTypesAddComponent, ParametersAddComponent, ParametersListComponent],
  exports: [HomeComponent],
  entryComponents: [UsersAddComponent, ProductsAddComponent, ParameterTypesAddComponent, ParametersAddComponent]
})
export class AdminModule { }
