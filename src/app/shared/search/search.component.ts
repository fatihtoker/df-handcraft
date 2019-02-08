import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from '../../site/product-detail/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // TODO: use productlist component in template.
  constructor() { }

  @Input() products: ProductModel[];
  @Input() loading = false;
  panelOpenState = false;

  ngOnInit() {
  }

}
