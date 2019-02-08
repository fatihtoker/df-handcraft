import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../product-detail/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor() { }
  @Input() products: ProductModel[];
  @Input() loading = false;
  isHovered = [false];

  ngOnInit() {
  }
  mouseEntered(id: any) {
    this.isHovered[id] = true;
  }
  mouseLeft(id: any) {
    this.isHovered[id] = false;
  }

}
