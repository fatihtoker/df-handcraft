import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule, MatTabsModule, MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatToolbarModule, MatExpansionModule, MatSnackBarModule
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
    MatSnackBarModule
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
    MatSnackBarModule
  ],
})
export class MaterialComponentsModule { }
