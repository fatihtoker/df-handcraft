import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteTrigger, MatIconRegistry} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DataService} from '../data-service/data.service';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../api/api.service';
import {startWith, map} from 'rxjs/internal/operators';

export interface ProductGroup {
  category: string;
  products: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item['name'].toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        transform: 'translateY(0)',
        display: 'block'
      })),
      state('hide', style({
        transform: 'translateY(-5%)',
        display: 'none'
      })),
      transition('show => hide', animate('250ms ease-out')),
      transition('hide => show', animate('250ms ease-in'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  toolbarState = 'show';
  previousPosition = 0;
  productGroups: ProductGroup[] = [];
  productForm: FormGroup = this.fb.group({
    productGroup: '',
  });
  productGroupOptions: Observable<ProductGroup[]>;
  @ViewChild(MatAutocompleteTrigger) autoGroup: MatAutocomplete;
  constructor(private matIconRegistry: MatIconRegistry, private fb: FormBuilder, private apiService: ApiService) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.apiService.get('products-category').subscribe(response => {
      this.init(response.data);
      });
    }
  ngOnInit() {
  }
  init (data) {
    this.productGroups = data;
    this.productGroupOptions = this.productForm.get('productGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }
  onPageScroll(scrollPosition) {

    if (this.previousPosition >= scrollPosition) {
      this.toolbarState = 'show';
    } else {
      this.toolbarState = 'hide';
      this.autoGroup.closePanel();
    }
    this.previousPosition = scrollPosition;
  }
  private _filterGroup(value: string): ProductGroup[] {
    if (value) {
      return this.productGroups
        .map(group => ({category: group.category, products: _filter(group.products, value)}))
        .filter(group => group.products.length > 0);
    }

    return this.productGroups;
  }
}
