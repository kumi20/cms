import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-mapy',
  templateUrl: './mapy.component.html',
  styleUrls: ['./mapy.component.scss']
})
export class MapyComponent implements OnInit {

  mapy;    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get('mapy/getList.php').subscribe(
        response =>{
            this.event.klepsydraStop();
            if(response!=null){
                this.mapy = response;
            }
        },
        error=>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error','Błąd pobierania danych');
        }
      )
  }
    
  delete(id){
      console.log('idDelete',id)
  }    

}
