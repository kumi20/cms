import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  gallery;
  uriGallery;
  idgallery;    

  ngOnInit() {
    this.event.klepsydraStart();
    this.uriGallery = this.CmsService.uriGallery;
    this.CmsService.get('gallery/galerryGet.php').subscribe(
      response=>{
        this.gallery = response;
        this.event.klepsydraStop();
      },
      error=>{
        this.event.wyswietlInfo('error','Błąd pobierania galerii');
        this.event.klepsydraStop();
      }
    )
  }

  idDelete(id){
      this.idgallery = id;   
  }
    
  deleted(){
    this.CmsService.get(`gallery/deleteGalerry.php?idGallery=${this.idgallery}`).subscribe(
        response=>{
            this.ngOnInit();
            this.event.wyswietlInfo('succes','Galeria została usunięta');
            document.getElementById('closeGrupa').click();
        },
        error=>{
            this.event.wyswietlInfo('error','Błąd usuwania galerii');
        }
      )
  }    

  edytuj(id){
    this._route.navigate(['/dodajGalerie',id]);
  }

}
