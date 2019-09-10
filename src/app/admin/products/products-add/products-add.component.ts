import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api/api.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit, OnDestroy {

  product = {
    id: null,
    name: '',
    category: null,
    description: '',
    onSale: null,
    price: null,
    type: null
  };
  categories = [];
  loading = false;
  apiSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<ProductsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCategories();
    if (this.data) {
      this.product.id = this.data.id;
      this.product.name = this.data.name;
      this.product.category = this.data.category;
      this.product.description = this.data.description;
      this.product.onSale = this.data.onSale;
      this.product.price = this.data.price;
      this.product.type = this.data.type;
    }
  }
  ngOnDestroy() {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  getCategories() {
    this.categories = [{
      id: null,
      name: 'select',
      displayName: 'Seçiniz...'
    }];
    this.apiSubscription = this.api.getWithCredentials('products/categories').subscribe(
      (response) => {
        for (const category of response.data) {
          this.categories.push(
            {
              id: category.id,
              name: category.name,
              displayName: category.display_name
            }
          );
        }
      }, (err) => {
        // handle error
      }
    );

  }
  onCancelClicked() {
    this.dialogRef.close();
  }
  onSaveClicked() {
    this.loading = true;

    this.api.postWithCredentials('products/create', this.product).subscribe(
      (response) => {
        this.loading = false;
        this._snackBar.open(response.message, '', {
          duration: 1500
        });
        this.dialogRef.close();
      }, (err) => {
        this.loading = false;
      }
    );
  }

}
