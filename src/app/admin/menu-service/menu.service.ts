import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {environment} from '../../../environments/environment';
import { ApiService } from 'src/app/shared/api/api.service';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/shared/data-service/data.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private dfAdmin: any;
  headers: HttpHeaders;
  token: any;
  checkHeaders: any;

  menus = [];

  constructor(private api: ApiService, private dataService: DataService) {
    this.dfAdmin = environment.dfAdmin;
    this.headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.token = localStorage.getItem('token');
    this.checkHeaders = this.headers.append(
      'Authorization', 'Bearer ' + this.token,
    );
  }
  getMenusObservable(params: any = {}): Observable<any> {
    return this.api.get(this.dfAdmin.menusURL, this.dfAdmin.baseURL, params, false, this.checkHeaders);
  }
  getMenus(params: any = {}) {
    this.menus = [];
    this.api.get(this.dfAdmin.menusURL, this.dfAdmin.baseURL, params, false, this.checkHeaders).subscribe(
      (response) => {
        for (const menu of response.data) {
          this.menus.push({
            id: menu.id,
            name: menu.name,
            displayName: menu.display_name,
            order: menu.order_index,
            active: false,
            routerLink: menu.router_link,
            iconClass: menu.icon_class
          });
        }
        this.menus.sort((a, b) => a.order - b.order);
        this.dataService.updateMenu(this.menus);
      }, (err) => {
        this.menus = [];
      }
    );
    return this.menus;
  }
}
