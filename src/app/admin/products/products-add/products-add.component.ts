import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api/api.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit, OnDestroy {

  product = {
    id: '',
    name: '',
    category: '',
    description: '',
    onSale: '',
    price: '',
    type: '',
    images: '',
  };
  categories = [];
  types = [];
  pageLoading = false;
  imageSrc: any;
  loading = false;
  categorySubscription: Subscription;
  typeSubscription: Subscription;
  apiSubscription: Subscription;
  errors: any = {};

  baseURL = environment.baseURL;

  constructor(public dialogRef: MatDialogRef<ProductsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    // todo: handle photos on update
    this.getCategories();
    this.getTypes();
    if (this.data) {
      this.product.id = this.data.id;
      this.product.name = this.data.name;
      this.product.category = this.data.category.id;
      this.product.description = this.data.description;
      this.product.onSale = this.data.on_sale;
      this.product.price = this.data.price;
      this.product.type = this.data.type.id;
      this.product.images = this.data.images;
    }
    console.log(this.data)
    console.log(this.product)
  }
  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  getTypes() {
    this.pageLoading = true;
    this.types = [{
      id: null,
      name: 'none',
      displayName: 'Yok'
    }];
    this.typeSubscription = this.api.getWithCredentials('products/types').subscribe(
      (response) => {
        for (const type of response.data) {
          this.types.push(
            {
              id: type.id,
              name: type.name,
              displayName: type.display_name
            }
          );
        }
        this.pageLoading = false;
      }, (err) => {
        this.pageLoading = false;
        // handle error
      }
    );
  }
  getCategories() {
    this.pageLoading = true;
    this.categories = [];
    this.categorySubscription = this.api.getWithCredentials('products/categories').subscribe(
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
        this.pageLoading = false;
      }, (err) => {
        // handle error
        this.pageLoading = false;
      }
    );

  }
  onFileSelected(eventTarget: any) {
    this.product.images = eventTarget.files;
    console.log(this.product.images);
  }
  onCancelClicked() {
    this.dialogRef.close();
  }
  onSaveClicked() {
    this.errors = [];
    this.loading = true;

    this.apiSubscription = this.api.postFileWithCredentials('products/create', this.product).subscribe(
      (response) => {
        this.loading = false;
        this._snackBar.open(response.message, '', {
          duration: 1500
        });
        this.dialogRef.close();
      }, (err) => {
        this.loading = false;
        this.errors = err.errors;
      }
    );
  }

}
