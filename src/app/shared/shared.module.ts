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
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

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
    SearchComponent, ProductListComponent, ConfirmDialogComponent],
  exports: [PageComponent, SearchComponent, ProductListComponent, ConfirmDialogComponent],
  providers: [],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
