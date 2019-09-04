import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatProgressSpinnerModule, MatTabsModule, MatAutocompleteModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatToolbarModule, MatExpansionModule, MatSnackBarModule, MatSidenavModule
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
    MatSidenavModule
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
    MatSidenavModule
  ],
})
export class MaterialComponentsModule { }
