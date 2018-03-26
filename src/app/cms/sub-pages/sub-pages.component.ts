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
    const json = JSON.stringify({
        'idParent': this.parent,
        'idLevel': this.level
      })
      this.CmsService.post('page/getMenu.php', json).subscribe(
      response => this.submenu = response
    )  
  }

  deletePagesId(id){
    this.idPageDelete = id;
  }

  deletePages(){
    const json = JSON.stringify({
        'idPageElement':this.idPageDelete
    })

      this.CmsService.post('page/pageNodeUp.php', json).subscribe(
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
    const json = JSON.stringify({
        'idPageElement':id
    })
      this.CmsService.post('page/positionPagesDown.php',json).subscribe(
          response =>{
              this.event.wyswietlInfo('info',"Przesunięto stronę w dół");
              this.ngOnInit();
          }
      )
  }
  
  positionUp(id){
    const json = JSON.stringify({
        'idPageElement':id
    })
    this.CmsService.post('page/positionPagesUp.php',json).subscribe(
      response =>{
          this.event.wyswietlInfo('info',"Przesunięto stronę do góry");
          this.ngOnInit();
      }
    )
  }
  
  positionNodeDown(id){
    const json = JSON.stringify({
        'idPageElement':id
    })
      this.CmsService.post('page/pageNodeDown.php',json).subscribe(
        response =>{
            this.event.wyswietlInfo('info',"Przesunięto stronę o poziom niżej");
            this.ngOnInit();
        }
      )
  }
  
  positionNodeUp(id){
    const json = JSON.stringify({
        'idPageElement':id
    })

      this.CmsService.post('page/pageNodeUp.php', json).subscribe(
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
