import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../menu-service/menu.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data-service/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  menuSubscription: Subscription;

  constructor(private dataService: DataService, private router: Router) {

   }

  ngOnInit() {
    this.menuSubscription = this.dataService.getMenuObservable().subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['admin-panel/' + response[0].routerLink]);
        }
      }
    );
  }
  ngOnDestroy() {
    if(this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }
}
