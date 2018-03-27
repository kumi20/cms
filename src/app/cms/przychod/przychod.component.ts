import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { przychod } from './przychod';
import { IMyDpOptions } from 'mydatepicker'; 

@Component({
  selector: 'app-przychod',
  templateUrl: './przychod.component.html',
  styleUrls: ['./przychod.component.scss']
})
export class PrzychodComponent implements OnInit {

  @ViewChild('odbiorcySelect') odbiorcySelect;   
    
  przychod: przychod = new przychod(); 
  month;
  year; 
  actaualDate;
  actualYear;
  actualMonth;
  odbiorcy: Array<any> = new Array();  
    
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
      
      this.route.params.subscribe(params => this.przychod.idPrzychodu = parseInt(params['id']));
      if (isNaN(this.przychod.idPrzychodu)) this.przychod.idPrzychodu = 0;
      
      
      this.month = this.CmsService.month;
      this.year = this.CmsService.year;
      
      this.actaualDate = new Date()
      this.przychod.rok = this.actaualDate.getFullYear().toString();
      this.przychod.miesiac = this.event.formatMonth(this.actaualDate.getMonth());
      
      this.event.klepsydraStart();
      this.CmsService.get(`kpir/getOdbiorcy.php`).subscribe(
        response =>{
            for(let i = 0; i < response.length; i++){
                this.odbiorcy.push({value: response[i].id, label: response[i].name},);
            }
            this.odbiorcySelect.updateOptionsList();
            this.event.klepsydraStop();
            
            if (this.przychod.idPrzychodu != 0){
            this.event.klepsydraStart();
            this.CmsService.get(`kpir/getPrzychod.php?id=${this.przychod.idPrzychodu}`).subscribe(
                response =>{
                    this.przychod.rok = response[0].rok;
                    this.przychod.dataZd = {'formatted': response[0].data_zd};
                    this.przychod.miesiac = response[0].miesiac;
                    this.przychod.nr_dow = response[0].nr_dow;
                    this.przychod.opis_zdarzenia = response[0].opis_zdarzenia;
                    this.przychod.id_kont = response[0].id_kont;
                    this.przychod.przych = response[0].przych;
                    this.przychod.pozostale_przychody = response[0].pozostale_przychody;
                    this.przychod.uwagi = response[0].uwagi;
                    this.event.klepsydraStop();
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error', 'Błąd pobierania danych'); 
                }
            )    
          }
            
        },
        error =>{
            this.event.wyswietlInfo('error', 'Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
      
      
      
  }
    
  powrot(){
    window.history.back(); 
  }
    
    zapisz(){
        let errorWalidation = false;
        
        if ((<any>this.przychod.dataZd).formatted!= null) this.przychod.dataZd = (<any>this.przychod.dataZd).formatted;
        this.przychod.przych = this.przychod.przych.replace(',','.');
        this.przychod.pozostale_przychody = this.przychod.pozostale_przychody.replace(',','.');
        
        if (this.przychod.id_kont == null) errorWalidation = true;
        if (this.przychod.nr_dow == '') errorWalidation = true;
        
        if(errorWalidation) this.event.wyswietlInfo('error', 'Uzupełnij wszystkie wymagane pola');
        else{
            this.event.klepsydraStart();
            this.CmsService.post(`kpir/postPrzychod.php`, this.przychod).subscribe(
                response =>{
                    this.event.wyswietlInfo('success', 'dodano przychód');
                    this.event.klepsydraStop();
                    this._route.navigateByUrl('/content-35');
                },
                error =>{
                    this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                    this.event.klepsydraStop();
                }
            )
        }
    }

    delete(){
        this.CmsService.get(`kpir/deleteKpir.php?id=${this.przychod.idPrzychodu}`).subscribe(
            respnose =>{
                this.event.wyswietlInfo('info', 'usunięto przychód');
                    this.event.klepsydraStop();
                    this._route.navigateByUrl('/content-35');
            },
            error =>{
                    this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                    this.event.klepsydraStop();
                }
        )
    }
}
