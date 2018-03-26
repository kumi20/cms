import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-tresc',
  templateUrl: './tresc.component.html',
  styleUrls: ['./tresc.component.scss']
})
export class TrescComponent implements OnInit {

  listaTresci;
  idTresci;
  page;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.route.params.subscribe(params => this.page = parseInt(params['id']));

      let uri = 'static/getTresc.php';

      this.CmsService.get(uri).subscribe(
          response => {
              this.listaTresci = response;
              this.event.klepsydraStop();
            },
            error => this.event.klepsydraStop()
      )
  }

  idDelete(id){
     this.idTresci = id;
  }

  deleteTresc(){
      let uri = 'static/deletetresc.php';
      const json = JSON.stringify({
        'id': this.idTresci
      })  

      this.CmsService.post(uri,json).subscribe(
          response => {
            let uri = 'static/getTresc.php';  
                this.CmsService.get(uri).subscribe(
                    response => {
                        this.listaTresci = response;
                        this.event.wyswietlInfo('info', 'Usunięto treść')
                    }
                )
            }

      )

      document.getElementById('closeUsunTresc').click();
  }

  pageChanged(page){
    this._route.navigate(['/content-24',page]);
    return page;
}

edytuj(id){
    this._route.navigate(['/dodajTresc',id]);
}

}
