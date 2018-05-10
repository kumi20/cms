import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { FileUploader } from 'ng2-file-upload';


const URL = 'http://kumi20.webd.pl/api/cms/gallery/uploudImages.php';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss']
})
export class AddCustomersComponent implements OnInit {

  id; 
    
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
    
  month;
  year;    
  faktury;
  actualYear;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      
      this.month = this.CmsService.month;
      this.year = this.CmsService.year;
      this.actualYear = new Date().getFullYear().toString();
      
      this.route.params.subscribe(params => this.id = parseInt(params['id']));
      if (isNaN(this.id)) this.id = 0;
      
      this.configFileUploud();
      this.downloadFV();
      
  }
    
    back(){
        history.back();
    }    

    upload(){
        for (let item of this.uploader.queue){   
            let fvName = item.file.name;
            let name = new Date().getTime() + Math.round(Math.random() * 10000000);
            item.file.name = name+'.pdf';
            item.url = `${this.CmsService.domaine}api/cms/customers/postFV.php?idUser=${this.id}&name=${fvName}&year=${(<any>item.file).year}&mounth=${(<any>item.file).month}`;
            item.upload();
        }
    }
    
     public configFileUploud(){
        this.uploader = new FileUploader({
            url: URL,
            authTokenHeader: 'Authorization',
            autoUpload: false,
            allowedMimeType: ['application/pdf'],
        });

        this.uploader.onAfterAddingFile  = (item) => {
            item.withCredentials = false;   
        }
        
        this.uploader.onWhenAddingFileFailed = () =>{
            this.event.wyswietlInfo('error', 'Niedozwolony plik');
        }
        
        this.uploader.onCompleteAll = () =>{
            this.event.wyswietlInfo('success', 'zapisano faktury');
            this.uploader.queue.length = 0;
            this.downloadFV();
        }
     }
    
    oplac(id){
        this.event.klepsydraStart();
        this.CmsService.get(`customers/payFV.php?id=${id}`).subscribe(
            response => {
                this.event.klepsydraStop();
                this.event.wyswietlInfo('info', 'Opłacono fakturę');
                this.downloadFV();
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', "Błąd zapisu danych")
            }
        )
    }
    

    downloadFV(){
        this.event.klepsydraStart();
          this.CmsService.get(`customers/getCustomerFV.php?id=${this.id}&year=${this.actualYear}`).subscribe(
            response=>{
                this.faktury = response;
                this.event.klepsydraStop();
            },
              error =>{
                  this.event.klepsydraStop();
                  this.event.wyswietlInfo('error','Błąd pobierania danych');
              }
          )
    }
}
