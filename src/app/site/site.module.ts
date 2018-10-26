import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {SharedModule} from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {MatButtonModule, MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [ProductDetailComponent, HomeComponent]
})
export class SiteModule { }
