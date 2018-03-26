import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { error } from 'util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  menuLista;

  ngOnInit() {
      let uri = 'menu/getMenu.php';
      this.event.klepsydraStart();
      this.CmsService.get(uri).subscribe(
          response => {
              this.menuLista = response;
              this.event.klepsydraStop();
          },
          error => this.event.klepsydraStop()
      )
  }

}
