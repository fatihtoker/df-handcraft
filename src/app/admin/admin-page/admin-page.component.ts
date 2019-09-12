import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {
  currentUser: any;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild('sideNav') sideNavRef: MatSidenav;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private title: Title) {
    this.title.setTitle('Admin Paneli - DF Handcraft');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onMenuItemClicked() {
    if (this.mobileQuery.matches) {
      this.sideNavRef.toggle();
    }
  }
}
