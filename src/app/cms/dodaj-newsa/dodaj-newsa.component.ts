import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker'; // do ustawiania opcji data pickera
import { FileUploader } from 'ng2-file-upload';

import { CmsService } from '../..//cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

const URL2 = 'http://kumi20.webd.pl/api/cms/gallery/uploudImages.php';

const URL = 'http://kumi20.webd.pl/api/plik.php';

@Component({
  selector: 'app-dodaj-newsa',
  templateUrl: './dodaj-newsa.component.html',
  styleUrls: ['./dodaj-newsa.component.scss']
})
export class DodajNewsaComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    monthLabels: {
        1:'Sty',
        2:'Lut',
        3:'Mar',
        4:'Kwi',
        5:'Maj',
        6:'Cze',
        7:'Lip',
        8:'Sie',
        9:'Wrz',
        10:'Paź',
        11:'Lis',
        12:'Gru'
    },
    todayBtnTxt: 'Dzisiaj',
    dayLabels:{
        su: 'niedz.',
        mo: 'pon.',
        tu: 'wt.',
        we: 'śr.',
        th: 'czw.',
        fr: 'pt.',
        sa: 'sob.', 
    },
};

public uploader:FileUploader = new FileUploader({url: URL});
    
public uploaderGalery:FileUploader = new FileUploader({url: URL2});
    
public hasBaseDropZoneOver:boolean = false;
public hasAnotherDropZoneOver:boolean = false;

public fileOverBase(e:any):void {
  this.hasBaseDropZoneOver = e;
}

public fileOverAnother(e:any):void {
  this.hasAnotherDropZoneOver = e;
}

idNewsa: number = 0;
dodanoZdjecieNewsa: boolean = false;
news_lead_img: string = '';
czyPublikowac: boolean = false;
news_pub_date;
news_lead: string = '';
news_content: string = '';
news_name: string = '';
grupaNewsow;
idGaleryNews: number = 0;
    
imagesBasic = new Array();    

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.idNewsa = parseInt(params['id']));
    if(!isNaN(this.idNewsa)){
        const json = JSON.stringify({
            'id':this.idNewsa
        })

        this.CmsService.post('news/getDetNews.php', json).subscribe(
            response => {
                this.event.klepsydraStart();
                if (response[0].news_status > 2 ) this.czyPublikowac = true;
                else this.czyPublikowac = false;
                this.news_lead_img = response[0].news_lead_img;
                this.news_lead = response[0].news_lead;
                this.news_pub_date = response[0].news_pub_date;
                this.news_pub_date = {formatted: response[0].news_pub_date};
                this.news_content = response[0].news_content;
                this.news_name = response[0].news_name;
                if (this.news_lead_img.length > 0) document.getElementById('img_lead').innerHTML = "<img src='"+this.news_lead_img+"' style='width:150px'>";
                this.event.klepsydraStop();
                this.idGaleryNews = response[0].gallery_id;
                this.setGaleryNews();
                
            },
            error => this.event.klepsydraStop()

        )

        
    }
    else this.idNewsa = 0;
      
    let uri = 'news/newsGroup.php';
    this.CmsService.get(uri).subscribe(
        response => {
            this.grupaNewsow = response;
            const json = JSON.stringify({
                'id': this.idNewsa
            })
            this.CmsService.post('news/getGrupaNewsa.php', json).subscribe(
                response => {
                   let pom = response;
                   this.grupaNewsow.forEach(element => {
                       for(let i = 0; i < pom.length; i++){
                           if(element.news_group_id == pom[i].news_group_id) element.zaznaczone = true;
                       }
                        
                   });
                }
            )
        }
    )
    this.configFileUploud();
    this.configFileUploudGalery();
  }

  public configFileUploud(){
    this.uploader = new FileUploader({
        url: URL,
        authTokenHeader: 'Authorization',
        autoUpload: true,
        allowedMimeType: ['image/jpeg', 'image/png'],
        queueLimit: 1, //ustawia limit ilości dodawania plików
    });

    this.uploader.onAfterAddingFile  = (item) => {
        item.withCredentials = false;
        const name = new Date().getTime() + Math.round(Math.random() * 10000000);
        const nameFile = item.file.name.split('.');
        item.file.name = name.toString() + '.' + nameFile[1];
        this.news_lead_img = this.CmsService.sourceImageNews+item.file.name;
    }

    //zdarzenie wywoluje sie po zakończeniu uploudu pliku
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            document.getElementById('img_lead').innerHTML = "<img src='"+this.news_lead_img+"' style='width:150px'>";
            this.uploader.queue.length = 0;
            this.dodanoZdjecieNewsa = true;
            this.event.wyswietlInfo('success', 'Dodano zdjęcie newsa')
    };

    this.uploader.onBeforeUploadItem = (item) =>{
        item.url = this.CmsService.uriNewsImage;
      }
}

powrot(){
    window.history.back();
  }

zapisz(){
    let pom = [];
    this.grupaNewsow.forEach(element=>{
        if(element.zaznaczone) pom.push(element.news_group_id);
    })

    this.grupaNewsow = pom;
    if( this.news_pub_date == null || this.news_name == '') this.event.wyswietlInfo('error','Uzupełnij wszystkie wymagane pola');
    else{
        const json = JSON.stringify({
            'czyPublikowac': this.czyPublikowac,
            'news_pub_date': this.news_pub_date.formatted,
            'news_name': this.news_name,
            'news_lead_img': this.news_lead_img,
            'news_lead':  this.news_lead,
            'news_content': this.news_content,
            'idNewsa': this.idNewsa,
            'grupa': this.grupaNewsow,
            'gallery_id': this.idGaleryNews
        })


        this.CmsService.post('news/addNews.php', json).subscribe(
            response => {
                this._route.navigateByUrl('/content-5');
               this.event.wyswietlInfo('success', 'Dodano newsa')
            }
    
        )
    }
}

formatujDate(liczba){
    
   return liczba=(liczba < 10)? "0"+liczba : liczba;
    
   }
    
    
    public configFileUploudGalery(){
        this.uploaderGalery = new FileUploader({
            url: URL2,
            authTokenHeader: 'Authorization',
            autoUpload: false,
            allowedMimeType: ['image/jpeg', 'image/png'],
        });

        this.uploaderGalery.onAfterAddingFile  = (item) => {
            item.withCredentials = false;   
        }

    
    

        //zdarzenie wywoluje sie po zakończeniu uploudu pliku
        this.uploaderGalery.onCompleteAll = () => {
            this.event.wyswietlInfo('success', 'Dodano zdjęcia');
            this.setGaleryNews();
        };
        
         this.uploaderGalery.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
                response = JSON.parse(response);
                this.idGaleryNews = response.idGallery;
         }

    }
    
    uploadGal(){
        for (let item of this.uploaderGalery.queue){     
                item.url = `${this.CmsService.uriUploudImageGallery}?idKatalog=${this.idGaleryNews}&description=${(<any>item.file).description}&nameGallery=${this.news_name}&descriptionGallery=${this.news_name}`;
                item.upload();
        }
    }
    
    

    setGaleryNews(){
        this.CmsService.get(`gallery/galleryId_Get.php?idGallery=${this.idGaleryNews}`).subscribe(
                  response => {

                    for(let i = 0; i < response.length; i++){
                      this.imagesBasic.push({
                        'img': this.CmsService.uriGallery+`/${this.idGaleryNews}/`+response[i].gallery_photo_name,
                        'thumb': this.CmsService.uriGallery+`/${this.idGaleryNews}/thumb/`+response[i].gallery_photo_name,
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
}
