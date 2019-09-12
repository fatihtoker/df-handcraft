import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatIconRegistry} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataService} from '../data-service/data.service';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../api/api.service';
import {startWith, map, debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import { ProductModel } from '../product-list/product.model';

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
        transform: 'translateY(-5%)',
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
  searchBarVisible = true;
  query: string;
  searchActive = false;
  loading = false;
  params = {};
  searchProducts: ProductModel[] = [];
  querySubscription: any;
  private queryChanged: Subject<string> = new Subject<string>();
  @ViewChild(MatAutocompleteTrigger) autoGroup: MatAutocompleteTrigger;
  constructor(private matIconRegistry: MatIconRegistry, private fb: FormBuilder,
              private apiService: ApiService, private dataService: DataService,
              private router: Router) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.querySubscription = this.queryChanged.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: any) => {

        let refresh = false;

        if (query) {
          if (query.length >= 2) {
          this.params = Object.assign(this.params, { query: query });
          refresh = true;
        }
        } else {
         // this.router.navigate(['/']);
        }

        if (refresh) {
          this.params = Object.assign({}, this.params);
          this.searchProducts = [];
          this.apiService.get('products', undefined, this.params ).subscribe(response => {
            for (const model of response.data) {
              this.searchProducts.push(new ProductModel(model));
            }
            this.dataService.updateData(this.searchProducts);
            this.router.navigate(['/arama']);

          }, err => {
          });
        }
      });
    }
  ngOnInit() {
   this.queryChanged.next(this.query);
  }
  onChange(query: any) {
    this.query = query;
    this.queryChanged.next(this.query);
  }
  onPageScroll(scrollPosition) {

    if (this.previousPosition >= scrollPosition) {
      this.toolbarState = 'show';
    } else {
      this.toolbarState = 'hide';
    }
    this.previousPosition = scrollPosition;
  }
  closePanel() {
    this.searchBarVisible = false;
  }
}
