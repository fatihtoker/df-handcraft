import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from './shared/page/page.component';

const routes: Routes = [
  {path: '', component: PageComponent, children: [
      {path: '', loadChildren: './site/site.module#SiteModule'}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
