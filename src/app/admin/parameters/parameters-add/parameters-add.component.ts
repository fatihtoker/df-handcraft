import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/shared/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parameters-add',
  templateUrl: './parameters-add.component.html',
  styleUrls: ['./parameters-add.component.scss']
})
export class ParametersAddComponent implements OnInit, OnDestroy {

  parameter = {
    id: null,
    name: '',
    displayName: '',
    parameterType: null
  };
  loading = false;
  apiSubscription: Subscription;
  parameterTypes = [];

  constructor(public dialogRef: MatDialogRef<ParametersAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.data) {
      this.parameter.id = this.data.id;
      this.parameter.name = this.data.name;
      this.parameter.displayName = this.data.display_name;
      this.parameter.parameterType = this.data.parameter_type.id;
    }
    this.getParameterTypes();
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

    this.api.postWithCredentials('parameters/create', this.parameter).subscribe(
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
  getParameterTypes() {
    this.loading = true;
    this.apiSubscription = this.api.getWithCredentials('parameter-types').subscribe(
      (response) => {
        this.parameterTypes = response.data;
        this.loading = false;
      }, (err) => {
        // handle error
        this.loading = false;
      }
    );
  }

}
