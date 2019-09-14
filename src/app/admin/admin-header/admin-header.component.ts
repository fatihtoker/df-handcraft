import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  animations: [
    trigger('actionPanel', [
    transition(':enter', useAnimation(fadeIn, {
      params: { timing: 0.2}
    })),
    transition(':leave', useAnimation(fadeOut, {
      params: { timing: 0.2}
    }))
   ])
  ],
})
export class AdminHeaderComponent implements OnInit {

  @Output() logoClicked = new EventEmitter();

  currentUser: any;

  actions = [];
  panelVisible = false;
  panelHovered = false;
  visibleTimeout: any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.actions.push(
      {
        name: 'Çıkış Yap',
        action: 'logOut'
      }
    );
    this.authService.getCurrentUser().subscribe(
      (response) => {
        this.currentUser = response.data;
      }, (err) => {
        console.log(err);
      }
    )
  }
  onLogoClicked() {
    this.logoClicked.emit();
  }
  onUserContainerMouseEntered() {
    clearTimeout(this.visibleTimeout);
    this.panelVisible = true;
  }
  onUserContainerMouseLeft() {
    this.visibleTimeout = setTimeout(() => {
      this.panelVisible = false;
    }, 200);
  }

  onDropdownClicked() {
    this.panelVisible = !this.panelVisible;
  }

  onActionClicked(action: string) {
    this.panelVisible = false;
    this.panelHovered = false;
    switch (action) {
      case 'logOut':
        this.authService.unAuthenticate();
    }
  }

}
