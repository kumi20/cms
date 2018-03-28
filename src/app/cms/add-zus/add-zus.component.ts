import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { zus } from './zus';

@Component({
  selector: 'app-add-zus',
  templateUrl: './add-zus.component.html',
  styleUrls: ['./add-zus.component.scss']
})
export class AddZusComponent implements OnInit {

  year;
  month;
  actualDate;
  actualYear;
  actualMonth;
  zus: zus = new zus();  
  monthPayment:string = '';
  yearPayment:number = 0;
    
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.year = this.CmsService.year;
      this.month = this.CmsService.month;
      this.actualDate = new Date();
      this.zus.rok = this.actualDate.getFullYear().toString();
      this.zus.miesiac = this.event.formatMonth(this.actualDate.getMonth());
      this.changeTerm();
      
      this.event.klepsydraStart();
  }
    
    changeTerm(){
        this.yearPayment = parseInt(this.zus.rok);
        
        switch(this.zus.miesiac){
        case '01': this.monthPayment = '02';
                    break;
        case '02': this.monthPayment = '03';
                    break;
        case '03': this.monthPayment = '04';
                    break;
        case '04': this.monthPayment = '05';
                    break;
        case '05': this.monthPayment = '06';
                    break;
        case '06': this.monthPayment = '07';
                    break;
        case '07': this.monthPayment = '08';
                    break;
        case '08': this.monthPayment = '09';
                    break;
        case '09': this.monthPayment = '10';
                    break;
        case '10': this.monthPayment = '11';
                    break;
        case '11': this.monthPayment = '12';
                    break;
        case '12': this.monthPayment = '01';
                    this.yearPayment++; 
                    break;
      }
      this.zus.termin_platnosci = this.yearPayment+'-'+this.monthPayment+'-'+'10';
      this.zus.data_spoleczne = this.zus.termin_platnosci;
      this.zus.data_zdrowotne = this.zus.termin_platnosci;
      this.zus.data_fundusz_pracy = this.zus.termin_platnosci; 
        
       this.CmsService.get(`zus/getWysokoscSkladek.php?year=${this.zus.rok}`).subscribe(
          response =>{
              this.zus.skladka_spoleczne = this.Round(response[0].zus_sp - response[0].chorobowe,2);
              this.zus.skladka_zdrowotne = response[0].zus_zdr;
              this.zus.skladka_fundusz_pracy = response[0].zus_fp;
              this.event.klepsydraStop();
          },
          error =>{
            this.event.wyswietlInfo('error', 'Błąd pobierania danych');
              this.event.klepsydraStop();
          }
      )        
    }
    
    back(){
        history.back();
    }
    
    save(){
        this.event.klepsydraStart();
        this.CmsService.post(`zus/postSkładka.php`, this.zus).subscribe(
            response =>{
                this.event.wyswietlInfo('success', 'Dodano składkę');
                this.event.klepsydraStop();
                this._route.navigateByUrl('/content-38');
            },
            error =>{
                this.event.wyswietlInfo('error', 'Bład zapisu danych');
                this.event.klepsydraStop();
            }
        )
    }
    
    Round(n, k) 
    {
        var factor = Math.pow(10, k+1);
        n = Math.round(Math.round(n*factor)/10);
        return n/(factor/10);
    }

}
