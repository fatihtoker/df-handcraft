import {Component, Input, OnInit} from '@angular/core';
import { ProductModel } from '../product-list/product.model';
import { DataService } from '../data-service/data.service';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  panelOpenState = false;
  loading = false;
  searchProducts: ProductModel[] = [];

  constructor(private dataService: DataService, private apiService: ApiService) { 
  }

  ngOnInit() {
    this.dataService.getDataObservable().subscribe(res => {
      if (res) {
        let prodCache = res;
        if (prodCache !== res) {
          this.loading = true;
        }
        this.searchProducts = res;
        this.loading = false;
      }
    });
  }

}
