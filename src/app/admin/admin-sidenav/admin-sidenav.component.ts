import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu-service/menu.service';
import { DataService } from 'src/app/shared/data-service/data.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {
  menus: any;

  constructor(private menuService: MenuService, private dataService: DataService) { }

  ngOnInit() {
    this.menus = [];
    this.menus = this.menuService.getMenus();

  }
  onMenuItemClicked(menuId) {
    for (const menu of this.menus) {
      if (menu.id === menuId) {
        menu.active = true;
        continue;
      }
      menu.active = false;
    }
  }

}
