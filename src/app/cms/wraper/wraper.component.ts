import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CmsService } from '../../cms.service';
import { EventService } from '../../event.service';
import { ActivatedRoute, Router } from '@angular/router';

import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';
import { EdytorComponent } from '../../edytor/edytor.component';
import { TrescComponent } from '../tresc/tresc.component';
import { StaticComponent } from '../../template/static/static.component';
import { BrakStronyComponent } from '../../brak-strony/brak-strony.component';
import { NewsComponentView } from '../../template/news/news.component';
import { MenuParent } from '../../template/menu/menu/menu.component';
import { MapyComponent } from '../../template/mapy/mapy.component';

import { StronaComponent } from '../strona/strona.component';
import { location } from 'angular-bootstrap-md/utils/facade/browser';
import { KontenerComponent } from '../kontener/kontener.component';


@Component({
  selector: 'app-wraper',
  templateUrl: './wraper.component.html',
  styleUrls: ['./wraper.component.scss'],
  inputs: ['idKontenera','idPage']
})
export class WraperComponent implements OnInit {

    @ViewChild('style') modals;
    @ViewChild('dynamic') dynamic: DynamicComponentComponent;
    @Output() odsiwezKontener = new EventEmitter();

    @ViewChild('kontainer') kontainer: KontenerComponent;
  kontrolki = [];
  kontrolkiDoWyswietlenia = [];
  idKontenera;
  idPage;
  deleteId;

  strona: StronaComponent;

  constructor(private ref: ElementRef, private CmsService: CmsService, private event: EventService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
      this.pobierzKontrolki();
  }

  pobierzKontrolki(){
        this.event.klepsydraStart();
        const json = JSON.stringify({
            'idContainer': this.idKontenera,
            'idPage': this.idPage
        })
        this.CmsService.post('page/getContainerElement.php', json).subscribe(
            response => {
                this.kontrolki = response;
                this.wyswietlKontrolki();
                
                this.event.klepsydraStop();
            },
            error => this.event.klepsydraStop()
        )

  }

  wyswietlKontrolki(){
      this.kontrolkiDoWyswietlenia.length = 0;
      this.kontrolki.forEach((value, index)=> {
          let k = null;
          
          switch(value.module_view_id){
                
              case '12': k = StaticComponent; break;
              case '1': k = NewsComponentView; break;
              case '6': k = MenuParent; break; 
              case '33': k = MapyComponent; break;      
              default: k = BrakStronyComponent; break;
          }

          this.kontrolkiDoWyswietlenia[index] = {
              component: k,
              idTresci: value.page_element_elemid,
              pageElement: value.page_element_id
          };
            
          console.log('kontrolki do wyswietlenia', this.kontrolkiDoWyswietlenia)
      }
      
    )
  }

  delete(id){
      this.deleteId = id;
  }

  usun(){
    const json = JSON.stringify({
        'id': this.deleteId
    })

      this.CmsService.post('page/deleteElementPages.php', json).subscribe(
          response => {
                this.modals.hide();
                //location.reload();
                this.ngOnInit();
                this.event.wyswietlInfo('info','Usunięto element');
           }
      )
    
      
  }

  upElement(id, idOrder){
    const json = JSON.stringify({
        'idPageElement': id.pageElement,
        'idKontenera': this.idKontenera
    })
        this.CmsService.post('page/positionElementUp.php', json).subscribe(
            response => {
                this.ngOnInit();
                this.event.wyswietlInfo('info','przeniesiono element o 1 pozycje do góry');
            }
        )
        
  }

  downlElement(id, idOrder){
    const json = JSON.stringify({
        'idPageElement': id.pageElement,
        'idKontenera': this.idKontenera
      })
        this.CmsService.post('page/positionElementDown.php', json).subscribe(
            response =>{
                this.ngOnInit();
                this.event.wyswietlInfo('info', 'przeniesiono element o 1 pozycje do dołu');
            }
        )
  }
}
