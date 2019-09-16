import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/shared/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parameter-types-add',
  templateUrl: './parameter-types-add.component.html',
  styleUrls: ['./parameter-types-add.component.scss']
})
export class ParameterTypesAddComponent implements OnInit, OnDestroy {

  parameterType = {
    id: null,
    name: '',
    displayName: ''
  };
  loading = false;
  apiSubscription: Subscription;
  errors = {};

  constructor(public dialogRef: MatDialogRef<ParameterTypesAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.data) {
      this.parameterType.id = this.data.id;
      this.parameterType.name = this.data.name;
      this.parameterType.displayName = this.data.display_name;
    }
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

    this.apiSubscription = this.api.postWithCredentials('parameter-types/create', this.parameterType).subscribe(
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
