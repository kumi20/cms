import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from '../../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../event.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class MenuParent implements OnInit {

  tresc;
  idtresci;
  pageElement;
  idModal;
  menu;    
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.getTemplate(`template/menu/getParent.php?id=${this.idtresci}&node=0&parent=0`).subscribe(
        response =>{
            if(response != null) this.menu = response;
            this.event.klepsydraStop();
        },
          error=>{
              this.event.wyswietlInfo('error', 'Błąd pobierania danych');
              this.event.klepsydraStop();
          }
      )
  }

}
