import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { ScrollListenerDirective } from './scroll-listener/scroll-listener.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MouseHoverListenerDirective } from './mouse-hover-listener/mouse-hover-listener.directive';
import {SearchComponent} from './search/search.component';
import {MaterialComponentsModule} from './material-components.module';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialComponentsModule

  ],
  declarations: [PageComponent, NavbarComponent, ScrollListenerDirective, MouseHoverListenerDirective,
    SearchComponent, ProductListComponent],
  exports: [PageComponent, SearchComponent, ProductListComponent],
  providers: []
})
export class SharedModule { }
