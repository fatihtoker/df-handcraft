import {Component, Input, OnInit} from '@angular/core';
import { ProductModel } from './product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  baseURL = environment.baseURL;

  constructor() { }
  @Input() products: ProductModel[];
  isHovered = [false];

  ngOnInit() {
    console.log(this.products);
  }
  mouseEntered(id: any) {
    this.isHovered[id] = true;
  }
  mouseLeft(id: any) {
    this.isHovered[id] = false;
  }

}
