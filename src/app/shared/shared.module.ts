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
import {AdminPageComponent} from './admin/admin-page/admin-page.component';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import {NbLayoutModule, NbSidebarModule, NbSidebarService} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialComponentsModule,
    NbLayoutModule,
    NbSidebarModule
  ],
  declarations: [PageComponent, NavbarComponent, ScrollListenerDirective, MouseHoverListenerDirective,
    SearchComponent, AdminPageComponent, AdminLoginComponent],
  exports: [PageComponent, SearchComponent, AdminPageComponent, AdminLoginComponent],
  providers: [NbSidebarService]
})
export class SharedModule { }
