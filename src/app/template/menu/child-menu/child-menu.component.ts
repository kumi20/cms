import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from '../../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../event.service';

@Component({
  selector: 'app-child-menu',
  templateUrl: './child-menu.component.html',
  styleUrls: ['./child-menu.component.scss'],
  inputs: ['parent','level','idtresci']
})
export class ChildMenuComponent implements OnInit {
  
  parent;
  level;
  submenu;
  idtresci;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.getTemplate(`template/menu/getParent.php?id=${this.idtresci}&node=${this.level}&parent=${this.parent}`).subscribe(
        response =>{
            if(response != null) this.submenu = response;
            this.event.klepsydraStop();
        },
          error=>{
              this.event.wyswietlInfo('error', 'Błąd pobierania danych');
              this.event.klepsydraStop();
          }
      )
  }

}
