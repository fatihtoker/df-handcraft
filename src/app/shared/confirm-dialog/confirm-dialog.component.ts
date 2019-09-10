import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  dialogData = {
    title: 'Onay',
    message: 'İşlemi onaylıyor musunuz?',
    cancelText: 'Vazgeç',
    confirmText: 'Onayla'
  };

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dialogData.title = this.data ? this.data.title : this.dialogData.title;
    this.dialogData.message = this.data ? this.data.message : this.dialogData.message;
    this.dialogData.cancelText = this.data ? this.data.cancelText : this.dialogData.cancelText;
    this.dialogData.confirmText = this.data ? this.data.confirmText : this.dialogData.confirmText;
  }
  onCancelClicked() {
    this.dialogRef.close('cancel');
  }
  onConfirmClicked() {
    this.dialogRef.close('confirm');
  }

}
