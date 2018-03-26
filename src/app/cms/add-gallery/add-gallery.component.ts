import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

import { FileUploader } from 'ng2-file-upload';


const URL = 'http://kumi20.webd.pl/api/cms/gallery/uploudImages.php';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  idGallery;
  listFiles = new Array();
  imagesBasic = new Array();
  nameGalery: string = '';
  descriptionGalery: string = '';

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.idGallery = parseInt(params['id']));
    if(isNaN(this.idGallery)) this.idGallery = 0;

    if(this.idGallery != 0){
        this.event.klepsydraStart();
        this.CmsService.get(`gallery/galleryId_Get.php?idGallery=${this.idGallery}`).subscribe(
          response => {
            
            for(let i = 0; i < response.length; i++){
                this.nameGalery = response[0].gallery_name;
                this.descriptionGalery = response[0].gallery_desc;
              this.imagesBasic.push({
                'img': this.CmsService.uriGallery+`/${this.idGallery}/`+response[i].gallery_photo_name,
                'thumb': this.CmsService.uriGallery+`/${this.idGallery}/thumb/`+response[i].gallery_photo_name,
                'description': response[i].description,
                'idPhoto': response[i].gallery_photo_id  
              })

              
            }
            this.event.klepsydraStop();
          },
          error =>{
            this.event.wyswietlInfo('error','Błąd pobierania galerii');
            this.event.klepsydraStop();
          }
        )
    }

    this.configFileUploud();
  }

  public configFileUploud(){
    this.uploader = new FileUploader({
        url: URL,
        authTokenHeader: 'Authorization',
        autoUpload: false,
        allowedMimeType: ['image/jpeg', 'image/png'],
    });

    this.uploader.onAfterAddingFile  = (item) => {
        item.withCredentials = false;   
    }

    
    

    //zdarzenie wywoluje sie po zakończeniu uploudu pliku
    this.uploader.onCompleteAll = () => {
        
        this.event.wyswietlInfo('success', 'Dodano zdjęcie newsa');
        this._route.navigateByUrl('/content-6');
    };

    }

    addListFiles(){
        this.uploader.queue.forEach(element =>{
            this.listFiles.push((<any>element.file).description);
        })
    }
    
    
    upload(){
        for (let item of this.uploader.queue){     
                item.url = `${this.CmsService.uriUploudImageGallery}?idKatalog=${this.idGallery}&description=${(<any>item.file).description}&nameGallery=${this.nameGalery}&descriptionGallery=${this.descriptionGalery}`;
                item.upload();
        }
    }

    powrot(){
      window.history.back();
    }
}
