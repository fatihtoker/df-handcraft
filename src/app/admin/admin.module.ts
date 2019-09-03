import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MaterialComponentsModule } from '../shared/material-components.module';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialComponentsModule
  ],
  declarations: [HomeComponent, AdminLoginComponent, AdminPageComponent, AdminHeaderComponent],
  exports: [HomeComponent]
})
export class AdminModule { }
