import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog, MatPaginatorIntl, MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiService } from 'src/app/shared/api/api.service';
import { ParametersAddComponent } from '../parameters-add/parameters-add.component';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

export interface Parameter {
  id: number;
  name: string;
  display_name: string;
  parameter_type: any;
}

@Component({
  selector: 'app-parameters-list',
  templateUrl: './parameters-list.component.html',
  styleUrls: ['./parameters-list.component.scss']
})
export class ParametersListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'displayName', 'parameterType', 'action'];
  dataSource: MatTableDataSource<Parameter>;
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
    this.apiSubscription = this.apiService.getWithCredentials('parameters').subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<Parameter>(response.data);
        this.dataSource.paginator = this.paginator;
        this.pageLoading = false;
      }, (err) => {
        // handle error
        this.pageLoading = false;
      }
    );
  }
  openDialog(data = null): void {
    const dialogRef = this.dialog.open(ParametersAddComponent, {
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

        this.apiService.postWithCredentials('parameters/delete/' + element.id).subscribe(
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
