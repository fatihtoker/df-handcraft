import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [PageComponent, NavbarComponent],
  exports: [PageComponent]
})
export class SharedModule { }
