import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../menu-service/menu.service';
import { DataService } from 'src/app/shared/data-service/data.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {
  menus: any;
  dfAdmin: any;

  @Output() menuItemClicked = new EventEmitter();

  constructor(private menuService: MenuService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dfAdmin = environment.dfAdmin;
    this.getMenus();
  }
  getMenus() {
    this.menus = [];
    this.menuService.getMenusObservable().subscribe(
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
        this.setActivation();
      }, (err) => {
        this.menus = [];
      }
    );
  }
  setActivation() {
    const routerUrl = this.router.url;
    const menuStartIndex = routerUrl.lastIndexOf('/') + 1;
    const currentMenu = routerUrl.substring(menuStartIndex, routerUrl.length);
    if (currentMenu === this.dfAdmin.panelURL) {
      this.menus[0].active = true;
      return;
    }
    for (const menu of this.menus) {
      if (menu.routerLink === currentMenu) {
        menu.active = true;
        continue;
      }
      menu.active = false;
    }
  }
  onMenuItemClicked(menuId) {
    for (const menu of this.menus) {
      if (menu.id === menuId) {
        menu.active = true;
        continue;
      }
      menu.active = false;
    }
    this.menuItemClicked.emit();
  }

}
