import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { statistic } from './statistic';

@Component({
  selector: 'app-kpir',
  templateUrl: './kpir.component.html',
  styleUrls: ['./kpir.component.scss']
})
export class KpirComponent implements OnInit{
    
  @ViewChild('yearSelected') yearSelected;
  kpir;
  year;
  month;    
  actualDate;
  actualYear;
  actualMonth;  
  statistic: statistic = new statistic();  

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      
      this.year = this.CmsService.year;
      this.month = this.CmsService.month;
      this.actualDate = new Date();
      this.actualYear = this.actualDate.getFullYear().toString();
      this.actualMonth = this.event.formatMonth(this.actualDate.getMonth());
      this.showKPiR();
      this.event.klepsydraStart();
      
  }
    
    showKPiR(){
        this.CmsService.get(`kpir/getKpir.php?month=${this.actualMonth}&year=${this.actualYear}`).subscribe(
            response =>{
                this.kpir = response;
                this.event.klepsydraStop();
            },
            error=>{
                this.event.wyswietlInfo('error','Błąd pobierania danych');
                this.event.klepsydraStop();
            }
        )
        
        this.CmsService.get(`kpir/statystyka.php?month=${this.actualMonth}&year=${this.actualYear}`).subscribe(
            response =>{
                this.statistic = response;
            },
            error =>{
                this.event.wyswietlInfo('error','Błąd pobierania danych');
            }
        )
    }
    
    edytuj(czyPrzych,id){
        if(czyPrzych == 1) this._route.navigate(['/dodajPrzychod',id]);
        else this._route.navigate(['/dodajRozchod',id]);
    }
}
