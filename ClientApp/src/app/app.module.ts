import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import {MatNativeDateModule} from '@angular/material/core';
import {GridComponent} from './grid/grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule, MatPaginatorModule} from '@angular/material';
import {UserEditDialogComponent} from './grid/user-edit-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    UserEditDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: '', component: GridComponent, pathMatch: 'full'},
    ]),
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent],
  entryComponents: [UserEditDialogComponent]
})
export class AppModule { }
