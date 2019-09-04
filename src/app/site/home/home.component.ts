import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../shared/api/api.service';
import { ProductModel } from '../../shared/product-list/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  loading = false;
  selectedIndex = 0;
  tabs = [];
  apiSubscription: any;
  constructor(private title: Title, private apiService: ApiService) {
    this.title.setTitle('Anasayfa - DF Handcraft');
  }
  ngOnInit() {
    this.tabs.push(
      {
        name: null,
        displayName: 'Tüm Ürünler'
      },
      {
        name: 'best_seller',
        displayName: 'Çok Satanlar'
      },
      {
        name: 'new_added',
        displayName: 'Yeni Eklenenler'
      }
    )
    this.getProducts();
  }
  onTabChanged(index) {
    this.selectedIndex = index;
    this.getProducts(this.tabs[index].name);
  }
  ngOnDestroy() {
    if (this.apiSubscription)
      { this.apiSubscription.unsubscribe(); }
  }
  getProducts(query = '') {
    this.products = [];
    this.loading = true;
    this.apiSubscription = this.apiService.get('products', undefined, {type: query}).subscribe(response => {
      for (const model of response.data) {
        this.products.push(new ProductModel(model));
      }
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
}
