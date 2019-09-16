import { Component, OnInit, Inject, OnDestroy, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/api/api.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit, OnDestroy {

  user = {
    id: null,
    email: '',
    password: '',
    roles: []
  };

  errors: any =  {};
  roles = [];
  userRoles = [];
  loading = false;
  apiSubscription: Subscription;
  roleSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<UsersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRoles();
    if (this.data) {
      this.user.id = this.data.id;
      this.user.email = this.data.email;
      this.userRoles = this.data.roles;
    }
  }
  getRoles() {
    this.roles = [];
    this.roleSubscription = this.api.getWithCredentials('roles').subscribe(
      (response) => {
        for (const role of response.data) {
          this.roles.push(
            {
              id: role.id,
              name: role.name,
              displayName: role.display_name,
              checked: this.hasRole(role.id)
            }
          );
        }
      }, (err) => {
        // handle error
      }
    );
  }
  hasRole(roleId) {
    if (!this.userRoles) { return false; }
    for (const role of this.userRoles) {
      if (role.id === roleId) {
        return true;
      }
    }
    return false;

  }
  ngOnDestroy() {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
  onCancelClicked() {
    this.dialogRef.close();
  }
  onSaveClicked() {
    this.loading = true;

    this.user.roles = this.roles.filter((el) =>  el.checked);

    this.apiSubscription = this.api.postWithCredentials('users/create', this.user).subscribe(
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
