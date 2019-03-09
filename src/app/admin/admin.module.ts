import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {AdminRoutingModule} from './admin-routing.module';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class AdminModule { }
