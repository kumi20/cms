import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class NewsletterComponent implements OnInit {

  idtresci;
  pageElement;
  email: string = ''; 
  infoVisible: boolean = false;
  info: string = '';
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
  }

  save(){
     if (this.email == '') this.event.wyswietlInfo('info', 'Podaj adres email');
      else{
          this.event.klepsydraStart();
          this.CmsService.getTemplate(`template/newsletter/post.php?email=${this.email}`).subscribe(
                response=>{
                    this.event.klepsydraStop();
                    this.info = response.status;
                    this.infoVisible= true;
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error','Błąd zapisu danych');
                }
          )
      }
  }    
}
