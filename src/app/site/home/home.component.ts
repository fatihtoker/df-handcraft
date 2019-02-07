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
  apiSubscription: any;
  constructor(private title: Title, private apiService: ApiService) {
    this.title.setTitle('Anasayfa - DF Handcraft');
  }
  ngOnInit() {
    this.getAllProducts();
  }
  ngOnDestroy() {
  }
  getAllProducts() {
    this.products = [];
    this.loading = true;
    this.apiSubscription = this.apiService.get('products').subscribe(response => {
      for (const model of response.data) {
        this.products.push(new ProductModel(model));
      }
      console.log(this.products);
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
