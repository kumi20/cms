import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CmsService } from '../cms.service';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

import { EdytorComponent } from '../edytor/edytor.component';
import { TrescComponent } from '../cms/tresc/tresc.component';
import { StaticComponent } from '../template/static/static.component';
import { BrakStronyComponent } from '../brak-strony/brak-strony.component';

import { StronaComponent } from '../cms/strona/strona.component';
import { NewsComponentView } from '../template/news/news.component';
import { location } from 'angular-bootstrap-md/utils/facade/browser';


@Component({
  selector: 'app-wrapper-pages',
  templateUrl: './wrapper-pages.component.html',
  styleUrls: ['./wrapper-pages.component.scss'],
  inputs: ['idKontenera','idPage']
})
export class WrapperPagesComponent implements OnInit {

    @ViewChild('style') modals;
    @Output() odsiwezKontener = new EventEmitter();

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




}
