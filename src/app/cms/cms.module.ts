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
import { AgmCoreModule } from '@agm/core';

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
import { ZusComponent } from './zus/zus.component';
import { AddZusComponent } from './add-zus/add-zus.component';
import { KalendarzComponent } from './kalendarz/kalendarz.component';

import { FullCalendarModule } from 'ng-fullcalendar';
import { WyposazenieComponent } from './wyposazenie/wyposazenie.component';
import { AddWyposazenieComponent } from './add-wyposazenie/add-wyposazenie.component';
import { MapyComponent } from './mapy/mapy.component';
import { AddMapComponent } from './add-map/add-map.component';
import { CformComponent } from './cform/cform.component';
import { AddCformComponent } from './add-cform/add-cform.component';
import { PollComponent } from './poll/poll.component';
import { AddPoolComponent } from './add-pool/add-pool.component';
import { ConfigComponent } from './config/config.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { AddNewsletterComponent } from './add-newsletter/add-newsletter.component';
import { KpirStatisticComponent } from './kpir-statistic/kpir-statistic.component';

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
    FullCalendarModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCWGwAYym9aNgPYwihVhdaB-pxnoE03-D4'
    })  
  ],
  declarations: [
    EdytorComponent,
    //CalendarComponent,
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
    PodatekComponent,
    ZusComponent,
    AddZusComponent,
    KalendarzComponent,
    WyposazenieComponent,
    AddWyposazenieComponent,
    MapyComponent,
    AddMapComponent,
    CformComponent,
    AddCformComponent,
    PollComponent,
    AddPoolComponent,
    ConfigComponent,
    NewsletterComponent,
    AddNewsletterComponent,
    KpirStatisticComponent
  ],
  providers: [CmsService, AuthGuard, EventService],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class CmsModule { }
