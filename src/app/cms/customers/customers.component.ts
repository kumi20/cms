import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`customers/getList.php`).subscribe(
            response=>{
                if(response != null) this.customers = response;
                this.event.klepsydraStop();
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error','Błąd pobierania danych');
            }
      )
  }
    
  delete(id){
      this.event.klepsydraStart();
      this.CmsService.get(`customers/delete.php?id=${id}`).subscribe(
            response=>{
                this.event.klepsydraStop();
                this.ngOnInit();
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
            }
      )
  }    

}
