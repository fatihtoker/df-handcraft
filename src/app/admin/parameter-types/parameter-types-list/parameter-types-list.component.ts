import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog, MatPaginatorIntl, MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/shared/api/api.service';
import { ParameterTypesAddComponent } from '../parameter-types-add/parameter-types-add.component';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

export interface ParameterType {
  id: number;
  name: string;
  display_name: string;
}

@Component({
  selector: 'app-parameter-types-list',
  templateUrl: './parameter-types-list.component.html',
  styleUrls: ['./parameter-types-list.component.scss']
})
export class ParameterTypesListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'displayName', 'action'];
  dataSource: MatTableDataSource<ParameterType>;
  apiSubscription: Subscription;

  loading = [];
  pageLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar,
    private paginatorInstance: MatPaginatorIntl) {
      this.paginatorInstance.itemsPerPageLabel = 'Sayfa başına element: ';
     }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.pageLoading = true;
    this.apiSubscription = this.apiService.getWithCredentials('parameter-types').subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<ParameterType>(response.data);
        this.dataSource.paginator = this.paginator;
        this.pageLoading = false;
      }, (err) => {
        // handle error
        this.pageLoading = false;
      }
    );
  }
  openDialog(data = null): void {
    const dialogRef = this.dialog.open(ParameterTypesAddComponent, {
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

        this.apiService.postWithCredentials('parameter-types/delete/' + element.id).subscribe(
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
