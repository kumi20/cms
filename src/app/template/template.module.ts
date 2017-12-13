import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBBootstrapModulePro } from '../typescripts/pro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routerModule} from '../app.routing';
import { HttpModule } from '@angular/http';
import { Router, CanActivate } from '@angular/router';

import { CmsService } from '../cms.service';
import { EventService } from '../event.service';
import { AuthGuard } from '../auth.guard';

import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { StaticComponent } from './static/static.component';
import { NewsComponentView } from './news/news.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FileUploadModule,
    Ng2PaginationModule,
    CKEditorModule,
    routerModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot()
  ],
  declarations: [StaticComponent, NewsComponentView],
  providers: [CmsService, AuthGuard, EventService],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class TemplateModule { }
