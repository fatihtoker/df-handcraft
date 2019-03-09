import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {MaterialComponentsModule} from '../shared/material-components.module';
import {SharedModule} from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    MaterialComponentsModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [ProductDetailComponent, HomeComponent],
  exports: []
})
export class SiteModule { }
