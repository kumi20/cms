import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  pool;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`pool/getList.php`).subscribe(
        response =>{
            if(response != null) this.pool = response;
            this.event.klepsydraStop();
        },
          error=>{
              this.event.klepsydraStop();
              this.event.wyswietlInfo('error', 'Błąd pobierania danych');
          }
      )
  }
    
  delete(id){
      this.event.klepsydraStart();
      this.CmsService.get(`pool/deletePool.php?id=${id}`).subscribe(
        response =>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('info','Usunięto sondę');
            this.ngOnInit();
        },
          error =>{
              this.event.klepsydraStop();
              this.event.wyswietlInfo('error','Błąd zapisu danych')
          }
      )
  }    

}
