import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }

  items: NbMenuItem[] = [
    {
      title: 'Menu link with parameters',
      expanded: true,
      children: [
        {
          title: 'Goes into angular `routerLink`',
          link: '', // goes into angular `routerLink`
        },
        {
          title: 'Goes directly into `href` attribute',
          url: '/example/menu/menu-link-params.component#some-location', // goes directly into `href` attribute
        },
        {
          title: 'Menu item path match `prefix`',
          link: '/example/menu/menu-link-params.component',
          queryParams: {someUrlParam: 'true'},
          pathMatch: 'prefix',
        },
        {
          title: 'Will be opened in new window (target=`_blank`)',
          url: 'https://github.com/akveo/nebular',
          target: '_blank',
        },
        {
          title: 'Menu item with icon',
          link: '/example/menu/menu-link-params.component',
          icon: 'nb-search',
        },
        {
          title: 'Hidden menu item',
          link: '',
          hidden: true,
        },
      ],
    },
  ];
}
