import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { rozchod } from './rozchod';
import { IMyDpOptions } from 'mydatepicker'; 

@Component({
  selector: 'app-rozchod',
  templateUrl: './rozchod.component.html',
  styleUrls: ['./rozchod.component.scss']
})
export class RozchodComponent implements OnInit {

  @ViewChild('dostawcySelect') dostawcySelect;    
  rozchod: rozchod = new rozchod();
  month;
  year; 
  actaualDate;
  dostawcy: Array<any> = new Array();    

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
      
      this.route.params.subscribe(params => this.rozchod.idRozchodu = parseInt(params['id']));
      if (isNaN(this.rozchod.idRozchodu)) this.rozchod.idRozchodu = 0;
      
      
      this.month = this.CmsService.month;
      this.year = this.CmsService.year;
      
      this.actaualDate = new Date()
      this.rozchod.rok = this.actaualDate.getFullYear().toString();
      this.rozchod.miesiac = this.event.formatMonth(this.actaualDate.getMonth());
      
      this.event.klepsydraStart();
      this.CmsService.get(`kpir/getDostawcy.php`).subscribe(
        response =>{
            for(let i = 0; i < response.length; i++){
                this.dostawcy.push({value: response[i].id, label: response[i].name});
            }
            
            this.dostawcySelect.updateOptionsList();
            this.event.klepsydraStop();
            
            if(this.rozchod.idRozchodu !=0){
                this.event.klepsydraStart();
                this.CmsService.get(`kpir/getRozchod.php?id=${this.rozchod.idRozchodu}`).subscribe(
                    response =>{
                        console.log('rozchod', response);
                        this.rozchod.rok = response[0].rok;
                        this.rozchod.dataZd = {'formatted': response[0].data_zd};
                        this.rozchod.miesiac = response[0].miesiac;
                        this.rozchod.nr_dow = response[0].nr_dow;
                        this.rozchod.opis_zdarzenia = response[0].opis_zdarzenia;
                        this.rozchod.id_kont = response[0].id_kont;
                        this.rozchod.zakup_towarow = response[0].zakup_towarow;
                        this.rozchod.wynagrodzenie_gotowka = response[0].wynagrodzenie_gotowka;
                        this.rozchod.koszty_uboczne = response[0].koszty_uboczne;
                        this.rozchod.pozostale_wydatki = response[0].pozostale_wydatki;
                        this.rozchod.uwagi = response[0].uwagi;
                            this.event.klepsydraStop();
                    },
                    error =>{
                        this.event.klepsydraStop();
                        this.event.wyswietlInfo('error','Błąd pobierania danych');
                    }
                )
            }
        },
        error =>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error','Błąd pobierania danych');
        }
      )
  }
    
    powrot(){
        window.history.back(); 
    }
    
    zapisz(){
        let errorWalidation = false;
        
        if ((<any>this.rozchod.dataZd).formatted!= null) this.rozchod.dataZd = (<any>this.rozchod.dataZd).formatted;
        this.rozchod.zakup_towarow = this.rozchod.zakup_towarow.replace(',','.');
        this.rozchod.wynagrodzenie_gotowka = this.rozchod.wynagrodzenie_gotowka.replace(',','.');
        this.rozchod.koszty_uboczne = this.rozchod.koszty_uboczne.replace(',','.');
        this.rozchod.pozostale_wydatki = this.rozchod.pozostale_wydatki.replace(',','.');
        
        if (this.rozchod.id_kont == null) errorWalidation = true;
        if (this.rozchod.nr_dow == '') errorWalidation = true;
        
        if(errorWalidation) this.event.wyswietlInfo('error', 'Uzupełnij wszystkie wymagane pola');
        else{
            this.event.klepsydraStart();
            this.CmsService.post(`kpir/postRozchod.php`, this.rozchod).subscribe(
                response =>{
                    this.event.wyswietlInfo('success', 'dodano rozchód');
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
        this.CmsService.get(`kpir/deleteKpir.php?id=${this.rozchod.idRozchodu}`).subscribe(
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
