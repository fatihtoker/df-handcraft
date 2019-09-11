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
    id: '',
    name: '',
    category: null,
    description: '',
    onSale: null,
    price: null,
    type: null,
    image: null
  };
  categories = [];
  types = [];
  imageSrc: any;
  loading = false;
  categorySubscription: Subscription;
  typeSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<ProductsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCategories();
    this.getTypes();
    if (this.data) {
      this.product.id = this.data.id;
      this.product.name = this.data.name;
      this.product.category = this.data.category;
      this.product.description = this.data.description;
      this.product.onSale = this.data.onSale;
      this.product.price = this.data.price;
      this.product.type = this.data.type;
      this.product.image = this.data.image;
    }
  }
  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
  }
  getTypes() {
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
      }, (err) => {
        // handle error
      }
    );
  }
  getCategories() {
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
      }, (err) => {
        // handle error
      }
    );

  }
  onFileSelected(eventTarget: any) {
    const reader = new FileReader();
    reader.readAsDataURL(eventTarget.files[0]);
    reader.onload = (_event) => {
      this.imageSrc = reader.result;
    };
    this.product.image = eventTarget.files;
  }
  onCancelClicked() {
    this.dialogRef.close();
  }
  onSaveClicked() {
    this.loading = true;

    this.api.postFileWithCredentials('products/create', this.product).subscribe(
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
