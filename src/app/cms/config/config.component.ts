import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { config } from './config';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  config: config = new config();    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`conf/getList.php`).subscribe(
        response=>{
            response.forEach(el=>{
                if (el.param_name == "page_title_prefix" ) this.config.page_title_prefix = el.param_value; 
                if (el.param_name == "Sender" ) this.config.Sender = el.param_value; 
                if (el.param_name == "analytics" ) this.config.analytics = el.param_value; 
                if (el.param_name == "description" ) this.config.description = el.param_value; 
                if (el.param_name == "keywords" ) this.config.keywords = el.param_value; 
            })
            
            

            console.log(this.config)
            this.event.klepsydraStop();
        },
        error=>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error','Błąd pobierania danych');
        }  
      )
  }

  back(){
      history.back();
  }    

  save(){
      this.event.klepsydraStart();
      this.CmsService.post(`conf/postConfig.php`,this.config).subscribe(
        response=>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('success','Zapisano ustawienia');
        },
        error =>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error', 'Błąd zapisywania danych');
        }
      )
  }
}
