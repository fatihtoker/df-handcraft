import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HomeComponent} from './home/home.component';
import { PageComponent } from '../shared/page/page.component';
import { SearchComponent } from '../shared/search/search.component';

const routes: Routes = [
  {path: '', component: PageComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'anasayfa', component: HomeComponent},
    {path: 'urunler/:id/detay', component: ProductDetailComponent},
    {path: 'arama', component: SearchComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
