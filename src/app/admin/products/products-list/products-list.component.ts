import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { MatDialog, MatSnackBar, MatPaginator, MatPaginatorIntl, MatTableDataSource } from '@angular/material';
import { ProductsAddComponent } from '../products-add/products-add.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

export interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  onSale: boolean;
  price: number;
  type: string;
}

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'category', 'name', 'onSale', 'price', 'type', 'action'];
  dataSource: MatTableDataSource<Product>;
  apiSubscription: Subscription;

  pageLoading = false;

  loading = [];

  constructor(private apiService: ApiService, public dialog: MatDialog,
     private _snackBar: MatSnackBar, private paginatorInstance: MatPaginatorIntl) {
    this.paginatorInstance.itemsPerPageLabel = 'Sayfa başına ürün: ';
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.pageLoading = true;
    this.apiSubscription = this.apiService.getWithCredentials('products').subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<Product>(response.data);
        this.dataSource.paginator = this.paginator;
        this.pageLoading = false;
      }, (err) => {
        // handle error
        this.pageLoading = false;
      }
    );
  }
  openDialog(data = null): void {
    const dialogRef = this.dialog.open(ProductsAddComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
  ngOnDestroy() {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  onRemoveItemClicked(element) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.loading[element.id] = true;

        this.apiService.postWithCredentials('products/delete/' + element.id).subscribe(
          (response) => {
            this.loading[element.id] = false;
            this.loadData();
            this.showMessage(response.message);
          }, (err) => {
            this.loading[element.id] = false;
          }
        );
      }
    });
  }
  onEditItemClicked(element) {
    this.openDialog(element);
  }
  showMessage(message) {
    this._snackBar.open(message, '', {
      duration: 2000
    });
  }

}
