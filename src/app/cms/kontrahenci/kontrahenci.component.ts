import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-kontrahenci',
  templateUrl: './kontrahenci.component.html',
  styleUrls: ['./kontrahenci.component.scss']
})
export class KontrahenciComponent implements OnInit {
    
    kontrahenci;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`kontrahenci/getList.php`).subscribe(
          response =>{
              this.kontrahenci = response;
              this.kontrahenci.forEach(element=>{
                  if (element.dostawca == 0) element.dostawca = "nie";
                  else element.dostawca = "tak";
                  
                  if (element.odbiorca == 0) element.odbiorca = "nie";
                  else element.odbiorca = "tak";
              })
             this.event.klepsydraStop();
          },
          error=>{
              this.event.wyswietlInfo('error', 'Błąd pobierania danych');
              this.event.klepsydraStop();
          }
      )
  }
    
  pageChanged(page){
    //this._route.navigate(['/content-24',page]);
    return page;
  }

}
