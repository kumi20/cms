import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { PagesComponent } from '../pages/pages.component';

@Component({
  selector: 'app-sub-pages',
  templateUrl: './sub-pages.component.html',
  styleUrls: ['./sub-pages.component.scss'],
  inputs: ['parent','level']
})
export class SubPagesComponent implements OnInit {

  @ViewChild('delete') delete;
  @Output() changesMenu = new EventEmitter();

  parent;
  level;
  submenu;
  idPageDelete;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
    this.CmsService.getPageMenu(this.parent, this.level).subscribe(
      response => this.submenu = response
    )  
  }

  deletePagesId(id){
    this.idPageDelete = id;
  }

  deletePages(){
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
  
  positionNodeUp(id){
      this.CmsService.pageNodeUp(id).subscribe(
          response => {
              this.event.wyswietlInfo('info','Przesunięto stronę o poziom wyżej');
              this.changesMenu.emit(); 
          }
      )
    
  }

  otworzMenu(id, nazwa){
    this._route.navigateByUrl('/content-3/'+id+'/'+nazwa);
}
}
