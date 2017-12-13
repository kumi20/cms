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
        this.CmsService.getContainerElement(this.idKontenera, this.idPage).subscribe(
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
      this.CmsService.deleteelementPage(this.deleteId).subscribe(
          response => {
                this.modals.hide();
                //location.reload();
                this.ngOnInit();
                this.event.wyswietlInfo('info','Usunięto element');
           }
      )
    
      
  }

  upElement(id, idOrder){
        this.CmsService.elementUP(id.pageElement, this.idKontenera).subscribe(
            response => {
                this.ngOnInit();
                this.event.wyswietlInfo('info','przeniesiono element o 1 pozycje do góry');
            }
        )
        
  }

  downlElement(id, idOrder){
        this.CmsService.elementDown(id.pageElement, this.idKontenera).subscribe(
            response =>{
                this.ngOnInit();
                this.event.wyswietlInfo('info', 'przeniesiono element o 1 pozycje do dołu');
            }
        )
  }
}
