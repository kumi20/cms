import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-zus',
  templateUrl: './zus.component.html',
  styleUrls: ['./zus.component.scss']
})
export class ZusComponent implements OnInit {

  year;
  actualDate;
  actualYear;
  actualMonth; 
  zus;    
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.year = this.CmsService.year;
      this.actualDate = new Date();
      this.actualYear = this.actualDate.getFullYear().toString();
      this.showZus();
  }

  showZus(){
      this.event.klepsydraStart();
      this.CmsService.get(`zus/getListZus.php?year=${this.actualYear}`).subscribe(
          response =>{
              this.zus = response;
              this.event.klepsydraStop();
          },
          error =>{
              this.event.wyswietlInfo('error', 'Błąd pobierania danych');
              this.event.klepsydraStop();
          }
      )
  }
    
   delete(id){
       this.event.klepsydraStart();
       this.CmsService.get(`zus/putZus.php?id=${id}`).subscribe(
            response=>{
                this.event.wyswietlInfo('info','usunięto składkę zus');
                this.event.klepsydraStop();
                this.showZus();
            },
            error=>{
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                this.event.klepsydraStop();
           }
       )
   }    
}
