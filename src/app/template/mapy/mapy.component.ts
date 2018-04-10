import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-mapy',
  templateUrl: './mapy.component.html',
  styleUrls: ['./mapy.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class MapyComponent implements OnInit {

  idtresci;
  pageElement;
    
  markerList: any[] = [];
  public map: any = { lat: 50.25234927320067, lng: 22.42212403297424 };
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();
      this.CmsService.get(`template/mapy/getList.php?id=${this.idtresci}`).subscribe(
        response=>{
            
            if (response != null){
                response.forEach(el=>{
                    this.markerList.push({
                          lat: Number(el.map_szer),
                          lng: Number(el.map_dlug),
                          draggable: false,
                          title: '',
                          description: el.map_content
                      });
                })    
                
            }
            this.event.klepsydraStop();
        },
          error=>{
              this.event.klepsydraStop();
              this.event.wyswietlInfo('error','Błąd pobierania danych');
          }
      )
  }

}
