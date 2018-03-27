import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';


@Component({
  selector: 'app-kpir',
  templateUrl: './kpir.component.html',
  styleUrls: ['./kpir.component.scss']
})
export class KpirComponent implements OnInit {

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`kpir/getKpir.php?month=03&year=2018`).subscribe(
            response =>{
                console.log('response', response);
                this.event.klepsydraStop();
            },
            error=>{
                this.event.wyswietlInfo('error','Błąd pobierania danych');
                this.event.klepsydraStop();
            }
      )
  }

}
