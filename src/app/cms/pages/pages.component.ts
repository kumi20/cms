import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  @ViewChild('delete') delete;

  menu;
  idPageDelete;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }


  ngOnInit() {
      this.CmsService.getPageMenu('0','0').subscribe(
          response => this.menu = response
      )
  }

  deletePagesId(id){
      this.idPageDelete = id;
  }

  deletePages(){
      if (this.idPageDelete == 1){
           this.event.wyswietlInfo('error','Nie mona usunąć strony głównej')
      }
      else{
        this.CmsService.deletePages(this.idPageDelete).subscribe(
            response => {
              if(response.kod < 0) this.event.wyswietlInfo('error', response.opis);
              else {
                  this.event.wyswietlInfo('info','Usunięto stronę');
                  this.ngOnInit();
                  this.delete.hide();
              }
            }
        )
      }
      
  }

  positionDown(id){
      this.CmsService.pageDown(id).subscribe(
          response =>{
              this.event.wyswietlInfo('info',"Przesunięto stronę w dół");
              this.ngOnInit();
          }
      )
  }

  positionUp(id){
    this.CmsService.pageUp(id).subscribe(
      response =>{
          this.event.wyswietlInfo('info',"Przesunięto stronę do góry");
          this.ngOnInit();
      }
    )
  }

  positionNodeDown(id){
      this.CmsService.pageNodeDown(id).subscribe(
        response =>{
            this.event.wyswietlInfo('info',"Przesunięto stronę o poziom niżej");
            this.ngOnInit();
        }
      )
  }

  odswiezMenu(){
      this.ngOnInit();
  }

  otworzMenu(id, nazwa){
        this._route.navigateByUrl('/content-3/'+id+'/'+nazwa);
  }
}
