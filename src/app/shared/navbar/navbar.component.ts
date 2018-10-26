import { Component, OnInit } from '@angular/core';
import {faChevronCircleDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faDown = faChevronCircleDown;

  constructor() { }

  ngOnInit() {
  }

}
