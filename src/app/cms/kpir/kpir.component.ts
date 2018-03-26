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
  }

}
