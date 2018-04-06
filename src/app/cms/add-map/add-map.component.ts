import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { MouseEvent} from '@agm/core';
import { marker } from './marker';

@Component({
  selector: 'app-add-map',
  templateUrl: './add-map.component.html',
  styleUrls: ['./add-map.component.scss']
})
export class AddMapComponent implements OnInit {

  @ViewChild('mapa') mapa;
  // google maps zoom level
  zoom: number = 8;
  label: string ='';
  description: string = ''; 
  latMap;
  lngMap;    
  // initial center position for the map
  lat: number = 52.2297700;
  lng: number = 21.0117800;
  id: number = 0;  
  showGroup: boolean = false;
  nameGroup: string = '';
    
  markerList: marker[] = [];    
  groupMapPointList: grupMapPoint[] = [];
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  clickedMarker(index: number, lat, lang, description) {
      this.latMap = lat;
      this.lngMap = lang;
  }
    
  mapClicked(event: MouseEvent) {
      console.log("event", event)
      if(this.markerList.length>0){
          this.event.wyswietlInfo('info','Można dodać tylko 1 punkt');
      }
      else{
          this.latMap = event.coords.lat;
          this.lngMap = event.coords.lng;
          this.markerList.push({
              lat: event.coords.lat,
              lng: event.coords.lng,
              draggable: true,
              title: '',
              grupa: [],
              description: this.description
          });
      }
  }
    
  markerDragEnd(m, event){
      this.latMap = event.coords.lat;
      this.lngMap = event.coords.lng;
  }    
    
  ngOnInit() {
      this.route.params.subscribe(params => this.id = parseInt(params['id']));
      if (isNaN(this.id)) this.id = 0;
      
      this.event.klepsydraStart();
      this.CmsService.get(`mapy/getListGroup.php`).subscribe(
        response =>{
            this.event.klepsydraStop();
            this.groupMapPointList = response;
            if (this.id != 0){
                this.event.klepsydraStart();
                this.CmsService.get(`mapy/getMapPoint.php?id=${this.id}`).subscribe(
                    response =>{
                        this.event.klepsydraStop();
                        if(response != null){
                            this.label = response[0].map_name;
                            this.description = response[0].map_content;
                            this.latMap = response[0].map_szer;
                            this.lngMap = response[0].map_dlug;
                            this.markerList.push({
                                  lat: Number(this.latMap),
                                  lng: Number(this.lngMap),
                                  draggable: true,
                                  title: '',
                                  grupa: [],
                                  description: this.description
                              });
                            response.forEach(el=>{
                                for(let i = 0; i < this.groupMapPointList.length; i++){
                                    if (this.groupMapPointList[i].map_group_id == el.map_group_id) this.groupMapPointList[i].checked = true;
                                }
                            })
                        }
                    },
                    error =>{
                        this.event.klepsydraStop();
                        this.event.wyswietlInfo('error', 'Błąd pobierania danych');
                    }
                )
            }
        },
        error =>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error', 'Błąd pobierania danych');
        }  
      )
  }
    
  back(){
      history.back();
  }
    
  save(){
      this.groupMapPointList.forEach(el=>{
          if(el.checked) this.markerList[0].grupa.push(el.map_group_id);
      })
      this.markerList[0].description = this.description;
      this.markerList[0].lat = parseFloat(this.latMap);
      this.markerList[0].lng = parseFloat(this.lngMap);
      this.markerList[0].title = this.label;
      this.event.klepsydraStart();
      this.CmsService.post(`mapy/postMarkPoint.php?id=${this.id}`, this.markerList).subscribe(
        response =>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('success', 'Dodano nowy punkt');
            this._route.navigateByUrl('/content-33');
        },
        error =>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error', 'Błąd zapisu danych'); 
        }
      )
  } 
    
    showAddGroup(){
        this.showGroup = true;
    }
    
    cancel(){
        this.showGroup = false;
    }
    
    addGroup(){
        if (this.nameGroup == '' || this.nameGroup == null) this.event.wyswietlInfo('info', 'Podaj nazwę grupy');
        else{
            this.event.klepsydraStart();
            this.CmsService.get(`mapy/postGroup.php?name=${this.nameGroup}`).subscribe(
                response=>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('success','Dodano grupę');
                    this.ngOnInit();
                    this.nameGroup = '';
                    this.showGroup = false;
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                }
            )
        }
    }
    
    deleteGroup(id){
        this.event.klepsydraStart();
        this.CmsService.get(`mapy/deleteGroup.php?id=${id}`).subscribe(
            response=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('info', 'Usunięto grupę');
                this.ngOnInit();
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
            }
        )
    }

}

export interface grupMapPoint{
    map_group_id: string;
    map_group_name: string;
    checked?: boolean;
}