import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBBootstrapModulePro } from './typescripts/pro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routerModule} from './app.routing';
import { HttpModule } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { CmsModule } from './cms/cms.module';

import { CmsService } from './cms.service';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';

import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CmsComponent } from './cms/cms.component';

import { FooterComponent } from './footer/footer.component';
import { WraperComponent } from './cms/wraper/wraper.component';

import { BrakStronyComponent } from './brak-strony/brak-strony.component';

import { MDBSpinningPreloader } from './typescripts/pro';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamicPagesComponent } from './dynamic-pages/dynamic-pages.component';
import { WrapperPagesComponent } from './wrapper-pages/wrapper-pages.component';

import * as $ from 'jquery';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CmsComponent,
    FooterComponent,
    BrakStronyComponent,
    DashboardComponent,
    DynamicPagesComponent,
    WrapperPagesComponent,
    //CalendarComponent
  ],
  imports: [
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
    MDBBootstrapModulePro.forRoot(),
    CmsModule
  ],
  providers: [CmsService, AuthGuard, EventService, MDBSpinningPreloader],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
