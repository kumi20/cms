import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { wyposazenie } from './wyposazenie';
import { IMyDpOptions } from 'mydatepicker'; 

@Component({
  selector: 'app-add-wyposazenie',
  templateUrl: './add-wyposazenie.component.html',
  styleUrls: ['./add-wyposazenie.component.scss']
})
export class AddWyposazenieComponent implements OnInit {
    
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
    
  wyposazenie: wyposazenie = new wyposazenie();    

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.route.params.subscribe(params => this.wyposazenie.id = parseInt(params['id']));
      if (isNaN(this.wyposazenie.id)) this.wyposazenie.id = 0;
      
      if (this.wyposazenie.id != 0){
          this.event.klepsydraStart();
          this.CmsService.get(`wyposazenie/getWyposazenie.php?id=${this.wyposazenie.id}`).subscribe(
            response =>{
                console.log('wyposazenie', response);
                this.wyposazenie.data_nabycia = {'formatted': response[0].data_nabycia};
                this.wyposazenie.numer_dokumentu = response[0].numer_dokumentu;
                this.wyposazenie.nazwa = response[0].nazwa;
                this.wyposazenie.miejsce_uzytkowania = response[0].miejsce_uzytkowania;
                this.wyposazenie.warotsc_poczatkowa = response[0].warotsc_poczatkowa;
                if (response[0].zlikwidowane == "0") this.wyposazenie.zlikwidowane = false;
                else this.wyposazenie.zlikwidowane = true;
                this.wyposazenie.przyczyna_likwidacji = response[0].przyczyna_likwidacji;
                this.wyposazenie.data_likwidacji = {'formatted': response[0].data_likwidacji}
                this.event.klepsydraStop();
            },
            errpr =>{
                this.event.wyswietlInfo('error', 'Błąd pobierania danych');
                this.event.klepsydraStop();
            }
          )
      }
  }
    
  back(){
     history.back();
  }   
    
  save(){
     if (this.wyposazenie.data_likwidacji == '' || this.wyposazenie.data_likwidacji == null) this.wyposazenie.data_likwidacji = '0000-00-00';
     else this.wyposazenie.data_likwidacji = this.wyposazenie.data_likwidacji.formatted;
      
     if (this.wyposazenie.nazwa == '' || this.wyposazenie.data_nabycia == '' || this.wyposazenie.numer_dokumentu == '') this.event.wyswietlInfo('error', "Uzupełnij nazwę i datę nabycia");  
     else{
        this.wyposazenie.data_nabycia = this.wyposazenie.data_nabycia.formatted;
        this.event.klepsydraStart(); 
        this.CmsService.post(`wyposazenie/postWyposazenie.php`, this.wyposazenie).subscribe(
            response =>{
                this.event.wyswietlInfo('success', 'Dodano wyposażenie');
                this.event.klepsydraStop();
                this._route.navigateByUrl('/content-39');
            },
            error =>{
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                this.event.klepsydraStop();
            }
        )
     }  
     
  }    
    
  delete(){
        this.event.klepsydraStart();
        this.CmsService.get(`wyposazenie/putWyposazenie.php?id=${this.wyposazenie.id}`).subscribe(
            response =>{
               this.event.wyswietlInfo('info', 'Usunięto wyposażenie');                
               this.event.klepsydraStop(); 
               this._route.navigateByUrl('/content-39');
            },
            error =>{
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                this.event.klepsydraStop();
            }
        )
  }    

}
