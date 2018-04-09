import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-cform',
  templateUrl: './cform.component.html',
  styleUrls: ['./cform.component.scss']
})
export class CformComponent implements OnInit {
    
  cform;    

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`cform/getList.php`).subscribe(
        response =>{
            if (response != null) this.cform = response;
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
        this.CmsService.get(`cform/delete.php?id=${id}`).subscribe(
            response => {
                this.event.klepsydraStop();
                this.event.wyswietlInfo('info','Usunięto formularz');
                this.ngOnInit();
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error','Błąd zapisu danych');
            }
        )
    }    

}
