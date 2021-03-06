import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuardService } from './auth-service/auth-guard.service';
import { AuthRedirectService } from './auth-service/auth-redirect.service';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ParameterTypesListComponent } from './parameter-types/parameter-types-list/parameter-types-list.component';
import { ParametersListComponent } from './parameters/parameters-list/parameters-list.component';


const routes: Routes = [
  {path: 'giris', component: AdminLoginComponent, canActivate: [AuthRedirectService]},
  {path: '', component: AdminPageComponent, canActivate: [AuthGuardService], children: [
    {path: '', component: HomeComponent},
    {path: 'kullanicilar', component: UsersListComponent},
    {path: 'urunler', component: ProductsListComponent},
    {path: 'parametre-turleri', component: ParameterTypesListComponent},
    {path: 'parametreler', component: ParametersListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
