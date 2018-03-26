import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CmsService } from '../cms.service';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  idStrony;

  ngOnInit() {
      this.route.params.subscribe(params => this.idStrony = parseInt(params['id']));
      if( isNaN(this.idStrony)) this.idStrony = 1;
      console.log(this.idStrony)
  }

  test(){
    this.CmsService.test().subscribe(
      response => console.log(response)
    )
  }
}
