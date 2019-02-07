import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from './shared/page/page.component';
import {AdminPageComponent} from './shared/admin/admin-page/admin-page.component';
import {AdminLoginComponent} from './shared/admin/admin-login/admin-login.component';
import {AuthGuardService} from './admin/auth-service/auth-guard.service';

const routes: Routes = [
  {path: '', component: PageComponent, children: [
      {path: '', loadChildren: './site/site.module#SiteModule'}
    ]
  },
  {path: 'admin-panel/giris', component: AdminLoginComponent},
  {path: 'admin-panel', component: AdminPageComponent, canActivate: [AuthGuardService], children: [
      {path: '', loadChildren: './admin/admin.module#AdminModule'}
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
