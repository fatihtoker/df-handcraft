import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule, MatTabsModule, MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatToolbarModule, MatExpansionModule, MatSnackBarModule, MatSidenavModule, MatTableModule, MatDialogModule, MatCheckboxModule, MatPaginatorModule, MatRadioModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule
  ],
  exports: [MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule
  ],
})
export class MaterialComponentsModule { }
