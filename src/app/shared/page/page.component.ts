import { Component, OnInit, OnChanges } from '@angular/core';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  displayState = 'none';
  dataSubscription: any;
  apiSubscription: any;
  
  constructor(private matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
  onScroll(scrollPosition) {
    this.displayState = scrollPosition > 350 ? 'block' : 'none';
  }
  onGoTopClick() {
    window.scroll(0, 0);
  }
}
