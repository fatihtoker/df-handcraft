import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ProductModel} from '../product-detail/product.model';
import {ApiService} from '../../shared/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductModel[] = [];
  constructor(private title: Title, private apiService: ApiService) {
    this.title.setTitle('Anasayfa - DF Handcraft');
  }
  ngOnInit() {
    this.apiService.get('products').subscribe(response => {
      for (const model of response.data) {
        this.products.push(new ProductModel(model));
      }
    }, err => {
      console.log('hata!', err);
    });
  }
}
