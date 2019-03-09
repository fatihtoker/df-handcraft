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
  apiSubscription: any;
  constructor(private title: Title, private apiService: ApiService) {
    this.title.setTitle('Anasayfa - DF Handcraft');
  }
  ngOnInit() {
    this.getAllProducts();
  }
  ngOnDestroy() {
    if (this.apiSubscription)
      { this.apiSubscription.unsubscribe(); }
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
}
