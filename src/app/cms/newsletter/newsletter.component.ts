import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  newsletter;
  page;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`newsletter/getList.php`).subscribe(
            response=>{
                this.event.klepsydraStop();
                if(response != null) this.newsletter = response;
                this.newsletter.forEach(el=>{
                    if(el.nletter_sent == "0") el.nletter_sent = "nie";
                    else el.nletter_sent = "tak";
                })
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('errir','Błąd pobierania danych');
            }
      )
  }
    
  pageChanged(page){
    //this._route.navigate(['/content-24',page]);
    return page;
  }  
    
    delete(id){
        this.event.klepsydraStart();
        this.CmsService.get(`newsletter/delete.php?id=${id}`).subscribe(
            response=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('info','Usunięto newsletter');
                this.ngOnInit();
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error','Błąd zapisu danych');
            }
        )
    }

}
