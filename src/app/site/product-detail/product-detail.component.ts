import {Component, OnInit, ViewChild} from '@angular/core';
import {NavbarComponent} from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @ViewChild(NavbarComponent) navbar: NavbarComponent;
  constructor() { }

  ngOnInit() {
  }

}
