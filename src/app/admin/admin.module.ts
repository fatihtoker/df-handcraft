import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AdminRoutingModule} from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NebularComponentsModule } from './nebular-components.module';
import { MaterialComponentsModule } from '../shared/material-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NebularComponentsModule,
    MaterialComponentsModule
  ],
  declarations: [HomeComponent, AdminLoginComponent, AdminPageComponent],
  exports: [HomeComponent]
})
export class AdminModule { }
