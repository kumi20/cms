import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-kontener',
  templateUrl: './kontener.component.html',
  styleUrls: ['./kontener.component.scss'],
  inputs: ['idKontener','idPage']
})
export class KontenerComponent implements OnInit {

  idKontener;
  idPage;
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
  }

  odswiezKontener(){
    this.ngOnInit();
  }
}
