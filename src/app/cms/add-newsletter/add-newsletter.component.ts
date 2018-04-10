import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { newsletter } from './newsletter';
import { IMyDpOptions } from 'mydatepicker'; 

@Component({
  selector: 'app-add-newsletter',
  templateUrl: './add-newsletter.component.html',
  styleUrls: ['./add-newsletter.component.scss']
})
export class AddNewsletterComponent implements OnInit {

  id;
  showSendButton: boolean = false;    
  newsletter: newsletter = new newsletter();    
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    monthLabels: {
        1:'Sty',
        2:'Lut',
        3:'Mar',
        4:'Kwi',
        5:'Maj',
        6:'Cze',
        7:'Lip',
        8:'Sie',
        9:'Wrz',
        10:'Paź',
        11:'Lis',
        12:'Gru'
    },
    todayBtnTxt: 'Dzisiaj',
    dayLabels:{
        su: 'niedz.',
        mo: 'pon.',
        tu: 'wt.',
        we: 'śr.',
        th: 'czw.',
        fr: 'pt.',
        sa: 'sob.', 
    },
   };
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.route.params.subscribe(params => this.id = parseInt(params['id']));
      if (isNaN(this.id)) this.id = 0;
      
      if(this.id != 0){
          this.event.klepsydraStart();
          this.CmsService.get(`newsletter/getNewsletter.php?id=${this.id}`).subscribe(
                response=>{
                    this.newsletter.nletter_data = {formatted: response[0].nletter_data};
                    this.newsletter.nletter_content = response[0].nletter_content;
                    this.newsletter.nletter_name = response[0].nletter_name;
                    if (response[0].nletter_sent == "0") this.newsletter.nletter_sent = false;
                    else this.newsletter.nletter_sent = true;
                    
                    if(!this.newsletter.nletter_sent) this.showSendButton = true;
                        
                    this.event.klepsydraStop();
                    
                },
                error=>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error','Błąd pobierania danych');
                }
          )
      }
  }
    
    save(){
        if(this.newsletter.nletter_data == '' || this.newsletter.nletter_data == null) this.event.wyswietlInfo('info', 'Podaj datę');
        else{
            this.event.klepsydraStart();
            this.newsletter.nletter_data = this.newsletter.nletter_data.formatted;
            this.CmsService.post(`newsletter/post.php?id=${this.id}`,this.newsletter).subscribe(
                response=>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('success','Dodano newsletter');
                    this.showSendButton = true;
                },
                error=>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error','Błąd zapisu danych');
                }
            )
        }
        
    }
    
    back(){
        history.back();
    }

    send(){
        this.event.klepsydraStart();
        this.CmsService.get(`newsletter/sendNewsletter.php?id=${this.id}`).subscribe(
            response =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('success','Newsletter został wysłany');
                this._route.navigateByUrl('/content-13');
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error','Błąd zapisu danych');
            }
        )
    }
}
