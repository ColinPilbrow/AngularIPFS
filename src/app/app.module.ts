import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
MatSelectModule,
MatGridListModule
} from '@angular/material';
import{FileSystem} from './file-system/file-system.component';
import{UploadBox} from './upload-box/upload-box.component';
import{AboutFooter} from './about-footer/about-footer.component';
import { ngfModule, ngf } from "angular-file"

@NgModule({
  declarations: [
    AppComponent, FileSystem, UploadBox, AboutFooter
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
MatSelectModule,
MatGridListModule,
ngfModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
