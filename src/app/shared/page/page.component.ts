import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {ProductModel} from '../../site/product-detail/product.model';
import {Title} from '@angular/platform-browser';
import {DataService} from '../data-service/data.service';
import {ApiService} from '../api/api.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  displayState = 'none';
  searchProducts: ProductModel[] = [];
  searchActive = false;
  loading = false;
  params = {};
  query: string;
  querySubscription: any;
  dataSubscription: any;
  apiSubscription: any;
  private queryChanged: Subject<string> = new Subject<string>();

  constructor(private matIconRegistry: MatIconRegistry, private title: Title, private apiService: ApiService, private dataService: DataService) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
   // this.title.setTitle('Anasayfa - DF Handcraft');
    this.dataSubscription = this.dataService.getDataObservable().subscribe(data => {
      if (data) {
        this.searchActive = true;
        this.queryChanged.next(data);
      } else {
        this.searchActive = false;
      }
    });
    this.querySubscription = this.queryChanged.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: any) => {
        this.query = query;

        let refresh = false;

        if (query.length > 1) {
          this.params = Object.assign(this.params, { query: query });
          refresh = true;
        } else if (query.length === 0) {
          this.params = {};
          refresh = true;
        }
        if (refresh) {
          this.loading = true;
          this.params = Object.assign({}, this.params);
          this.searchProducts = [];
          this.apiSubscription = this.apiService.get('products', undefined, this.params ).subscribe(response => {
            for (const model of response.data) {
              this.searchProducts.push(new ProductModel(model));
              //this.products.push(new ProductModel(model));
            }
            this.loading = false;
          }, err => {
            this.loading = false;
          });
        }
      });
  }
  onScroll(scrollPosition) {
    this.displayState = scrollPosition > 100 ? 'block' : 'none';
  }
  onGoTopClick() {
    window.scroll(0, 0);
  }
}
