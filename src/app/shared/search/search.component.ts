import {Component, Input, OnInit} from '@angular/core';
import { ProductModel } from '../product-list/product.model';
import { DataService } from '../data-service/data.service';
import { Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/internal/operators';
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



  // TODO: use productlist component in template.
  constructor(private dataService: DataService, private apiService: ApiService) { 
    this.loading = true;
    this.dataService.getDataObservable().subscribe(res => {
      if (res) {
        this.searchProducts = res;
        this.loading = false;
      }
    })
  }

  ngOnInit() {
  }

}
