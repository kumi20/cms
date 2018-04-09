import { RouterModule, Routes, CanActivate, RouterLinkActive} from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { CmsComponent } from './cms/cms.component';
import { TrescComponent } from './cms/tresc/tresc.component';
import { DodajTrescComponent } from './cms/dodaj-tresc/dodaj-tresc.component';
import { BrakStronyComponent } from './brak-strony/brak-strony.component';
import { WraperComponent } from './cms/wraper/wraper.component';
import { DynamicComponentComponent } from './cms/dynamic-component/dynamic-component.component';
import { NewsComponent } from './cms/news/news.component';
import { DodajNewsaComponent } from './cms/dodaj-newsa/dodaj-newsa.component';
import { NewsGroupComponent } from './cms/news-group/news-group.component';
import { UserComponent } from  './cms/user/user.component';
import { AddUserComponent } from './cms/add-user/add-user.component';
import { StronaComponent } from './cms/strona/strona.component';
import { KontenerComponent } from './cms/kontener/kontener.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentComponent } from './cms/content/content.component';
import { MenuComponent } from './cms/menu/menu.component';
import { MenuDetalisComponent } from './cms/menu-detalis/menu-detalis.component';
import { GalleryComponent } from './cms/gallery/gallery.component';
import { AddGalleryComponent } from './cms/add-gallery/add-gallery.component';
import { KpirComponent } from './cms/kpir/kpir.component'; 
import { PrzychodComponent } from './cms/przychod/przychod.component';
import { RozchodComponent} from './cms/rozchod/rozchod.component';
import { KontrahenciComponent } from './cms/kontrahenci/kontrahenci.component';
import { PomocComponent } from './cms/pomoc/pomoc.component';
import { AddKontrahentaComponent } from './cms/add-kontrahenta/add-kontrahenta.component'; 
import { PodatekComponent } from './cms/podatek/podatek.component';
import { ZusComponent } from './cms/zus/zus.component';
import { AddZusComponent } from './cms/add-zus/add-zus.component';
import { KalendarzComponent } from './cms/kalendarz/kalendarz.component';
import { WyposazenieComponent } from './cms/wyposazenie/wyposazenie.component';
import { AddWyposazenieComponent } from './cms/add-wyposazenie/add-wyposazenie.component';
import { MapyComponent } from './cms/mapy/mapy.component';
import { AddMapComponent } from './cms/add-map/add-map.component';
import { CformComponent } from './cms/cform/cform.component';
import { AddCformComponent } from './cms/add-cform/add-cform.component';
import { PollComponent } from './cms/poll/poll.component';
import { AddPoolComponent } from './cms/add-pool/add-pool.component' 

/// ROUTING
const routesConfig: Routes = [
    { path: '', component: LoginComponent},
    { path: 'page/:id/:name', component: DashboardComponent},
    { path: 'cms', component: LoginComponent},
    { path: 'content', component: ContentComponent, canActivate: [AuthGuard]},
    { path: 'content-24', component: TrescComponent, canActivate: [AuthGuard]},
    { path: 'content-24/:id', component:TrescComponent, canActivate:[AuthGuard]},
    { path: 'dodajTresc', component: DodajTrescComponent, canActivate: [AuthGuard]},
    { path: 'dodajTresc/:id', component: DodajTrescComponent, canActivate: [AuthGuard]},
    { path: 'content-5', component: NewsComponent, canActivate: [AuthGuard]},
    { path: 'content-5/:id', component: NewsComponent, canActivate: [AuthGuard]},
    { path: 'dodajNewsa', component: DodajNewsaComponent, canActivate: [AuthGuard]},
    { path: 'dodajNewsa/:id', component: DodajNewsaComponent, canActivate: [AuthGuard]},
    { path: 'newsGroup', component: NewsGroupComponent, canActivate: [AuthGuard]},
    { path: 'newsGroup/:id', component: NewsGroupComponent, canActivate: [AuthGuard]},
    { path: 'content-1', component: UserComponent, canActivate: [AuthGuard]},
    { path: 'dodajUzytkownika', component: AddUserComponent, canActivate: [AuthGuard]},
    { path: 'dodajUzytkownika/:id', component: AddUserComponent, canActivate: [AuthGuard]},
    { path: 'content-3', component: StronaComponent, canActivate: [AuthGuard]},
    { path: 'content-3/:id/:nazwa', component: StronaComponent, canActivate: [AuthGuard]},
    { path: 'content-2', component: MenuComponent, canActivate: [AuthGuard]},
    { path: 'content-2/:id', component: MenuDetalisComponent, canActivate: [AuthGuard]},
    { path: 'content-6', component: GalleryComponent, canActivate: [AuthGuard]},
    { path: 'dodajGalerie', component: AddGalleryComponent, canActivate: [AuthGuard]},
    { path: 'content-35', component: KpirComponent, canActivate: [AuthGuard]},
    { path: 'dodajPrzychod', component: PrzychodComponent, canActivate: [AuthGuard]},
    { path: 'dodajPrzychod/:id', component: PrzychodComponent, canActivate: [AuthGuard]},
    { path: 'dodajRozchod', component: RozchodComponent, canActivate: [AuthGuard]},
    { path: 'dodajRozchod/:id', component: RozchodComponent, canActivate: [AuthGuard]},
    { path: 'dodajGalerie/:id', component: AddGalleryComponent, canActivate: [AuthGuard]},
    { path: 'content-36', component: KontrahenciComponent, canActivate: [AuthGuard]},
    { path: 'dadajKontrahent', component: AddKontrahentaComponent, canActivate: [AuthGuard]},
    { path: 'dadajKontrahent/:id', component: AddKontrahentaComponent, canActivate: [AuthGuard]},
    { path: 'content-34', component: PomocComponent, canActivate: [AuthGuard]},
    { path: 'content-37', component: PodatekComponent, canActivate: [AuthGuard]},
    { path: 'content-38', component: ZusComponent, canActivate: [AuthGuard]},
    { path: 'dodajZus', component:AddZusComponent , canActivate: [AuthGuard]},
    { path: 'content-21', component: KalendarzComponent, canActivate: [AuthGuard]},
    { path: 'content-39', component: WyposazenieComponent, canActivate: [AuthGuard]},
    { path: 'dodajWyposazenie', component: AddWyposazenieComponent, canActivate: [AuthGuard]},
    { path: 'dodajWyposazenie/:id', component: AddWyposazenieComponent, canActivate: [AuthGuard]},
    { path: 'content-33', component: MapyComponent, canActivate: [AuthGuard]},
    { path: 'dodajMape', component: AddMapComponent, canActivate: [AuthGuard]},
    { path: 'dodajMape/:id', component: AddMapComponent, canActivate: [AuthGuard]},
    { path: 'content-9', component: CformComponent, canActivate: [AuthGuard]},
    { path: 'addCform', component: AddCformComponent, canActivate: [AuthGuard]},
    { path: 'addCform/:id', component: AddCformComponent, canActivate: [AuthGuard]},
    { path: 'content-12', component: PollComponent, canActivate: [AuthGuard]},
    { path: 'addPool', component: AddPoolComponent, canActivate:[AuthGuard]},
    { path: 'addPool/:id', component: AddPoolComponent, canActivate:[AuthGuard]},
    { path: 'test', component: KontenerComponent },
    { path: '**', component: BrakStronyComponent},
    
  ]

export const routerModule = RouterModule.forRoot(routesConfig, {
    enableTracing: false,
    useHash: true,
})