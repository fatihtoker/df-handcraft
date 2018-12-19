import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataService} from '../data-service/data.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';

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
export class NavbarComponent implements OnInit {
  toolbarState = 'show';
  previousPosition = 0;
  query = '';
  constructor(private matIconRegistry: MatIconRegistry, private dataService: DataService) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
   // this.dataService.dataSource$.pipe(debounceTime(500), distinctUntilChanged());
  }
  ngOnInit() {
    this.dataService.updateData('');
  }
  onPageScroll(scrollPosition) {

    if (this.previousPosition >= scrollPosition) {
      this.toolbarState = 'show';
    } else {
      this.toolbarState = 'hide';
    }
    this.previousPosition = scrollPosition;
  }
  onChange(query: string) {
    this.dataService.updateData(query);
  }
}
