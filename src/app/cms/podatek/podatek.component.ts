import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { tax } from './podatek';

@Component({
  selector: 'app-podatek',
  templateUrl: './podatek.component.html',
  styleUrls: ['./podatek.component.scss']
})
export class PodatekComponent implements OnInit {

  year;
  month;
  podatek;
  actualDate;
  actualYear;
  actualMonth; 
  yearTax;
  taxCal: boolean = false;
  tax: tax = new tax();
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      
      this.year = this.CmsService.year;
      this.month = this.CmsService.month;
      this.actualDate = new Date();
      this.actualYear = this.actualDate.getFullYear().toString();
      this.yearTax = this.actualDate.getFullYear().toString();
      this.actualMonth = this.event.formatMonth(this.actualDate.getMonth());
      this.showTax();
      
  }
    
  showTax(){
      this.event.klepsydraStart();
      this.CmsService.get(`podatek/getListDochodowy.php?year=${this.actualYear}`).subscribe(
            response=>{
                this.podatek = response;
                console.log('response', response);
                this.event.klepsydraStop();
            },
           error=>{
                this.event.wyswietlInfo('error','Błąd pobierania danych');
                this.event.klepsydraStop();
           }
      )
  }    

    delete(id){
        this.event.klepsydraStart();
        this.CmsService.get(`podatek/putPodatek.php?id=${id}`).subscribe(
            response =>{
                this.event.wyswietlInfo('info', 'Usunięto podatek');
                this.showTax();
                this.event.klepsydraStop();
            },
            error =>{
                this.event.wyswietlInfo('error','Błąd zapisu danych');
                this.event.klepsydraStop();
            }
        )
    }
    
    calculateTax(){
        this.taxCal = true;
        this.event.klepsydraStart();
        this.CmsService.get(`podatek/calculateTax.php?year=${this.yearTax}&month=${this.actualMonth}`).subscribe(
            response =>{
                this.tax = response;    
                this.event.klepsydraStop();
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', 'Błąd pobierania danych');
            }
        )
    }
    
    cancel(){
        this.taxCal = false;
    }
    
    saveTax(){
        this.event.klepsydraStart();
        this.CmsService.post(`podatek/postTax.php`, this.tax).subscribe(
            response => {
                this.event.wyswietlInfo('success', 'Zapisano podatek');
                this.event.klepsydraStop();
                this.showTax();
                this.taxCal = false;
            },
            error =>{
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                this.event.klepsydraStop();
            }
        )
    }
}
