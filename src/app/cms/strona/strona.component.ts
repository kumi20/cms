import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { Response } from '@angular/http/src/static_response';
import { PagesComponent } from '../pages/pages.component';

import { stronaModel } from './strona';


@Component({
  selector: 'app-strona',
  templateUrl: './strona.component.html',
  styleUrls: ['./strona.component.scss']
})
export class StronaComponent implements OnInit, OnChanges{

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }
   
  @ViewChild('kontainer') kontainer;
  @ViewChild('strona') strona; 
  @ViewChild('menuStron') menuStron: PagesComponent; 
  @ViewChild('widok') widok;
  @ViewChild('style') style;  

  pages;
  kontenery;
  newsyIsShow: boolean = true;
  idStrony;
  idKontenera;

  stronaModel: stronaModel = new stronaModel;

  modelElemen: Array<any>; 
  widokElement: Array<any>;
  trescElement: Array<any>;

  nameKOntener: string = '';
  namePages: string = '';
  numerNowejStronu: number = 0;  
  nowaNazwa: string = ''

  ngOnInit() {
    this.route.params.subscribe(params => this.idStrony = parseInt(params['id']));
    this.route.params.subscribe(params => this.namePages = params['nazwa']);
    this.nowaNazwa = '';
    if (this.namePages == null) this.namePages = 'home';
    if( isNaN(this.idStrony)) this.idStrony = 1;
    this.stronaModel.page_id = this.idStrony;
      this.CmsService.get('page/getPages.php').subscribe(
          response => {
            let pom = new Array;
            response.forEach(element => {
                pom.push({value:element.page_id,label:element.page_name})
            });

            this.pages = pom;
          }
      )

      this.CmsService.get('page/getContainer.php').subscribe(
          response => this.kontenery = response
      )
  }

  ngOnChanges(){
      this.ngOnInit();
  }

  idKonteneraAdd(id){
    this.CmsService.get('page/getModule.php').subscribe(
        response => {
            let pom = new Array;
            response.forEach(element => {
                pom.push({value:element.module_id,label:element.module_full_name})
            });
            this.modelElemen = pom;
        }
    )
        this.idKontenera = id;
        this.stronaModel.page_container_id = this.idKontenera;
        
  }

  wybranyModul(event){
      this.stronaModel.module_id = event.value;
      const json = JSON.stringify({
        'idModel': event.value
    })
      this.CmsService.post('page/getModelView.php', json).subscribe(
          response => {
              let pom = new Array;
              response.forEach(element => {
                  pom.push({value: element.module_view_id,label:element.module_view_name})
              });

              this.widokElement = pom;
              this.widok.select(this.widokElement[0].value);
          }
      )

      switch(event.value){
          case '24':  let uri = 'static/getTresc.php'; 
                      this.CmsService.get(uri).subscribe(
                      response => {
                          let pom = new Array;
                          response.forEach(element => {
                              pom.push({value: element.static_Id, label:element.static_name})
                          });
                          this.trescElement = pom;
                          }
                      );
                      break;
          case '5':   let grupa = 'news/newsGroup.php';   
                      this.CmsService.get(grupa).subscribe(
                            response => {
                                let pom = new Array;
                                response.forEach(element => {
                                    pom.push({value: element.news_group_id, label:element.news_group_name})
                                });
                                this.trescElement = pom;
                            }
                      )
                      break;
      }
  }

  deleteKontener(id){
      this.idKontenera = id;
  }

  usunKontener(){
      this.event.klepsydraStart();
      const json = JSON.stringify({
        'id':this.idKontenera
    })
      this.CmsService.post('page/deleteKontener.php', json).subscribe(
          response => {
              this.ngOnInit();
              this.event.wyswietlInfo('info', 'Usunięto kontener');
              this.event.klepsydraStop();
          },
          error => this.event.klepsydraStop()
      )
  }

  dodajKontener(){
      if(this.nameKOntener.length == 0) this.event.wyswietlInfo('error','Musisz podać nazwę kontenera');
      else{
        const json = JSON.stringify({
            'name':this.nameKOntener
        })
          this.CmsService.post('page/addKontainer.php', json).subscribe(
              response =>{
                  if(response.kod < 0) this.event.wyswietlInfo('error', response.opis);
                  else {
                      this.event.wyswietlInfo('success','Dodano kontener');
                      this.ngOnInit();
                      this.kontainer.hide();
                  }
              }
          )
          
      }
  }


  dodajStrone(){
      if(this.namePages.length == 0) this.event.wyswietlInfo('error', 'Musisz podać nazwę strony');
      else if (this.numerNowejStronu == 0) this.event.wyswietlInfo('error', 'Musisz wybrać stronę nadrzędną');
      else{
        const json = JSON.stringify({
            'number': this.namePages,
            'name': this.numerNowejStronu
        })
          this.CmsService.post('page/addPages.php', json).subscribe(
              response =>{
                if(response.kod < 0) this.event.wyswietlInfo('error', response.opis);
                else {
                    this.event.wyswietlInfo('success','Dodano stronę');
                    this.menuStron.ngOnInit();
                    this.strona.hide();
                }
              }
          )
      }

 }

  wybranaStrona(event){
      this.numerNowejStronu = event.value;
  }

  pobierzStrony(){
    this.CmsService.get('page/getPages.php').subscribe(
        response => {
          let pom = new Array;
          response.forEach(element => {
              pom.push({value:element.page_id,label:element.page_name})
          });

          this.pages = pom;
        }
    )
  }

  wybranyWidok(event){
      this.stronaModel.module_view_id = event.value
  }

  wybranaTresc(event){
      this.stronaModel.page_element_elemid = event.value;
      
  }

  dodajElement(){
      if(this.stronaModel.module_id == 0 || this.stronaModel.module_view_id == 0 || this.stronaModel.page_element_elemid == 0) 
          this.event.wyswietlInfo('error', 'wybierz wszystkie dane')
      else{
        const json = JSON.stringify({
            'elementModel': this.stronaModel
        })
            this.CmsService.post('page/addElementPages.php',json).subscribe(
                response => {
                    if(response.kod < 0) this.event.wyswietlInfo('error', response.opis);
                    else {
                        this.ngOnInit();
                        this.event.wyswietlInfo('success','Dodano nowy element');
                        this.style.hide();
                    }
                }
            ) 
      }  
  }

  zmienNazwe(){
      if (this.nowaNazwa == ''){
          this.event.wyswietlInfo('error', 'Nazwa nie może by pusta');
      }
      else
      {
        const json = JSON.stringify({
            'name': this.nowaNazwa,
            'id': this.idStrony
        })
            this.CmsService.post('page/updateNamePages.php', json).subscribe(
            response => {
                if(response.kod < 0) this.event.wyswietlInfo('error', response.opis);
                else {
                    this.menuStron.ngOnInit();
                    this.event.wyswietlInfo('success','Zmieniono nazwę');
                }
            }
          )
    }
  }
}
