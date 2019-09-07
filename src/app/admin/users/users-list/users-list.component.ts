import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/shared/api/api.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UsersAddComponent } from '../users-add/users-add.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

export interface User {
  id: number;
  email: string;
  roles: string;
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'email', 'roles', 'action'];
  dataSource = [];
  apiSubscription: Subscription;

  loading = [];

  constructor(private apiService: ApiService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    const tempDataSource = [];
    this.apiSubscription = this.apiService.getWithCredentials('users').subscribe(
      (response) => {
        for (const item of response.data) {
          tempDataSource.push(
            {
              id: item.id,
              email: item.email,
              roles: this.getRolesAsString(item.roles)
            }
          );
        }
        this.dataSource = tempDataSource;
      }, (err) => {
        // handle error
      }
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(UsersAddComponent, {
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

        this.apiService.postWithCredentials('users/delete/' + element.id).subscribe(
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
  showMessage(message) {
    this._snackBar.open(message, '', {
      duration: 1500
    });
  }

  getRolesAsString(roles: []) {
    if (roles.length === 0) {
      return '';
    }
    let rolesString = '';
    for (let i = 0; i < roles.length; i++) {
      rolesString += roles[i]['display_name'];
      if (i !== roles.length - 1) {
        rolesString += ', ';
      }
    }
    return rolesString;
  }

}
