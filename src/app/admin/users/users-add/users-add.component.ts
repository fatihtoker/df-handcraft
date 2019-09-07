import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api/api.service';
import { rotateInUpLeft } from 'ng-animate';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit, OnDestroy {

  user = {
    email: '',
    password: '',
    roles: []
  };

  roles = [];
  loading = false;
  apiSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<UsersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) { }

  ngOnInit() {
    this.roles = [];
    this.apiSubscription = this.api.getWithCredentials('roles').subscribe(
      (response) => {
        for (const role of response.data) {
          this.roles.push(
            {
              id: role.id,
              name: role.name,
              displayName: role.display_name,
              checked: false
            }
          );
        }
      }, (err) => {
        // handle error
      }
    );
  }
  ngOnDestroy() {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }
  onCancelClicked() {
    this.dialogRef.close();
  }
  onSaveClicked() {
    this.loading = true;

    this.user.roles = this.roles.filter((el) =>  el.checked);

    this.api.postWithCredentials('users/create', this.user).subscribe(
      (response) => {
        this.loading = false;
        this.dialogRef.close();
      }, (err) => {
        this.loading = false;
      }
    );
  }
}
