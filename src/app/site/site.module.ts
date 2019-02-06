import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {MaterialComponentsModule} from '../shared/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    MaterialComponentsModule
  ],
  declarations: [ProductDetailComponent, HomeComponent],
})
export class SiteModule { }
