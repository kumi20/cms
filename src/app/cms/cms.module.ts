import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBBootstrapModulePro } from '../typescripts/pro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routerModule} from '../app.routing';
import { HttpModule } from '@angular/http';
import { Router, CanActivate } from '@angular/router';

import { EdytorComponent } from '../edytor/edytor.component';

import { TemplateModule } from '../template/template.module';

import { CmsService } from '../cms.service';
import { EventService } from '../event.service';
import { AuthGuard } from '../auth.guard';

import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { FileUploadModule } from 'ng2-file-upload';

import { WraperComponent } from './wraper/wraper.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TrescComponent } from './tresc/tresc.component';
import { DodajTrescComponent } from './dodaj-tresc/dodaj-tresc.component';
import { NewsComponent } from './news/news.component';
import { DodajNewsaComponent } from './dodaj-newsa/dodaj-newsa.component';
import { NewsGroupComponent } from './news-group/news-group.component';
import { UserComponent } from './user/user.component';
import { UstawieniaComponent } from './ustawienia/ustawienia.component';
import { StronaComponent } from './strona/strona.component';
import { AddUserComponent } from './add-user/add-user.component';
import { KontenerComponent } from './kontener/kontener.component';
import { PagesComponent } from './pages/pages.component';
import { SubPagesComponent } from './sub-pages/sub-pages.component';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';
import { MenuDetalisComponent } from './menu-detalis/menu-detalis.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { KpirComponent } from './kpir/kpir.component';
import { PrzychodComponent } from './przychod/przychod.component';
import { RozchodComponent } from './rozchod/rozchod.component';
import { KontrahenciComponent } from './kontrahenci/kontrahenci.component';
import { PomocComponent } from './pomoc/pomoc.component';
import { AddKontrahentaComponent } from './add-kontrahenta/add-kontrahenta.component';
import { PodatekComponent } from './podatek/podatek.component';

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
    MDBBootstrapModulePro.forRoot(),
    TemplateModule,
    BrowserAnimationsModule
  ],
  declarations: [
    EdytorComponent,
    NavbarComponent,
    TrescComponent,
    DodajTrescComponent,
    NewsComponent,
    DodajNewsaComponent,
    NewsGroupComponent,
    UserComponent,
    UstawieniaComponent,
    StronaComponent,
    AddUserComponent,
    WraperComponent,
    DynamicComponentComponent,
    KontenerComponent,
    PagesComponent,
    SubPagesComponent,
    ContentComponent,
    MenuComponent,
    MenuDetalisComponent,
    GalleryComponent,
    AddGalleryComponent,
    KpirComponent,
    PrzychodComponent,
    RozchodComponent,
    KontrahenciComponent,
    PomocComponent,
    AddKontrahentaComponent,
    PodatekComponent
  ],
  providers: [CmsService, AuthGuard, EventService],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class CmsModule { }
