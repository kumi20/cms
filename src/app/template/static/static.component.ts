import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';


@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class StaticComponent implements OnInit {
  
  tresc;
  idtresci;
  pageElement;
  idModal;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }
  
  ngOnInit() {
    this.idModal = new Date().getTime() + Math.round(Math.random() * 10000000);
    this.event.klepsydraStart();
     this.CmsService.getStatic(this.idtresci).subscribe(
         response => {
           this.tresc = response[0].static_content;
            document.getElementById(this.idModal).innerHTML = this.tresc; 
            this.event.klepsydraStop();
        },
        error => this.event.klepsydraStop()
     )
  }

}
