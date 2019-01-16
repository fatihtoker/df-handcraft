import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatToolbarModule
} from '@angular/material';
import { ScrollListenerDirective } from './scroll-listener/scroll-listener.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MouseHoverListenerDirective } from './mouse-hover-listener/mouse-hover-listener.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  declarations: [PageComponent, NavbarComponent, ScrollListenerDirective, MouseHoverListenerDirective],
  exports: [PageComponent]
})
export class SharedModule { }
