import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { pomoc } from './pomoc';

@Component({
  selector: 'app-pomoc',
  templateUrl: './pomoc.component.html',
  styleUrls: ['./pomoc.component.scss']
})
export class PomocComponent implements OnInit {

  pomoc: pomoc = new pomoc();
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
  }

    sendMessage(){
        if (this.pomoc.wiadomosc == '' || this.pomoc.email == '') this.event.wyswietlInfo('error','podaj email i treść wiadomości');
        else{
            this.event.klepsydraStart();
            this.CmsService.post(`pomoc/sendMail.php`, this.pomoc).subscribe(
                response =>{
                    this.event.wyswietlInfo('success', 'Twoje zgłoszenie zostało wysłane');
                    this.event.klepsydraStop();
                    this.pomoc.email = '';
                    this.pomoc.firma = '';
                    this.pomoc.imie = '';
                    this.pomoc.telefon = '';
                    this.pomoc.wiadomosc = '';
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error', 'Błąd wysyłania wiadomości');
                }
            )
        }
    }
}
