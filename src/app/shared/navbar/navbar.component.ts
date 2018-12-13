import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        transform: 'translateY(0)',
        display: 'block'
      })),
      state('hide', style({
        transform: 'translateY(-10%)',
        display: 'none'
      })),
      transition('show => hide', animate('250ms ease-out')),
      transition('hide => show', animate('250ms ease-in'))
    ])
  ]
})
export class NavbarComponent {
  toolbarState = 'show';
  previousPosition = 0;
  constructor(private matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
  onPageScroll(scrollPosition) {

    if (this.previousPosition >= scrollPosition) {
      this.toolbarState = 'show';
    } else {
      this.toolbarState = 'hide';
    }
    this.previousPosition = scrollPosition;
  }
}
