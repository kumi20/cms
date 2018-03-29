import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-wyposazenie',
  templateUrl: './wyposazenie.component.html',
  styleUrls: ['./wyposazenie.component.scss']
})
export class WyposazenieComponent implements OnInit {

  wyposazenie;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }
    
  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`wyposazenie/getListWyposazenie.php`).subscribe(
        response => {
            this.wyposazenie = response;
            this.event.klepsydraStop();
        },
        error =>{
            this.event.wyswietlInfo('error','Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
  }

}
