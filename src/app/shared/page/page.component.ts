import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  displayState = 'none';

  constructor(private matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
  onScroll(scrollPosition) {
    this.displayState = scrollPosition > 100 ? 'block' : 'none';
  }
  onGoTopClick() {
    window.scroll(0, 0);
  }
}
