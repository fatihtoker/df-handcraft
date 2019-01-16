import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ProductModel} from '../product-detail/product.model';
import {ApiService} from '../../shared/api/api.service';
import {DataService} from '../../shared/data-service/data.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  isHovered = [false];
  loading = false;
  params = {};
  query: string;
  querySubscription: any;
  dataSubscription: any;
  apiSubscription: any;
  private queryChanged: Subject<string> = new Subject<string>();
  constructor(private title: Title, private apiService: ApiService, private dataService: DataService) {
    this.title.setTitle('Anasayfa - DF Handcraft');
    this.dataSubscription = this.dataService.getDataObservable().subscribe(data => {

      if (data) {
        this.queryChanged.next(data);
      } else {
        this.getAllProducts();
      }
    });
    this.querySubscription = this.queryChanged.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query: any) => {
        this.query = query;
        console.log(query);

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
          this.products = [];
          this.apiSubscription = this.apiService.get('products', undefined, this.params ).subscribe(response => {
            for (const model of response.data) {
              this.products.push(new ProductModel(model));
            }
            this.loading = false;
          }, err => {
            this.loading = false;
          });
        }
      });
  }
  ngOnInit() {
    // TODO: get all products when component loaded
    // this.getAllProducts();
  }
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
    this.apiSubscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }
  getAllProducts() {
    this.products = [];
    this.loading = true;
    this.apiSubscription = this.apiService.get('products').subscribe(response => {
      for (const model of response.data) {
        this.products.push(new ProductModel(model));
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
  mouseEntered(id: any) {
    this.isHovered[id] = true;
  }
  mouseLeft(id: any) {
    this.isHovered[id] = false;
  }
}
