import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { error } from 'util';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  collapse;
  newsy;
  page;
  grupaNewsow;
  newsyIsShow: boolean = true;
  idNewsa;
  idGroup;
  
  
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
    this.event.klepsydraStart();
    this.route.params.subscribe(params => this.page = parseInt(params['id']));

    let uri = 'news/getNewsy.php';
        this.CmsService.get(uri).subscribe(
            response => {
                this.newsy = response;
                this.event.klepsydraStop();
            },
            error => this.event.klepsydraStop()
        )

    let grupa = 'news/newsGroup.php';    
    this.CmsService.get(grupa).subscribe(
        response => this.grupaNewsow = response
    )
  }

  pageChanged(page){
    this._route.navigate(['/content-5',page]);
    return page;
  }

  edytuj(id){
      
    this._route.navigate(['/dodajNewsa',id]);
  }

  edytujNews(id){
    this._route.navigate(['/newsGroup',id]);
  }

  idDelete(id){
    this.idNewsa = id;
  }

 deleteTresc(){
    const json = JSON.stringify({
        'id': this.idNewsa
    })
    this.CmsService.post('news/deleteNews.php', json).subscribe(
        response =>{
            let uri = 'news/getNewsy.php';
            this.CmsService.get(uri).subscribe(
                response => {
                    this.newsy = response;
                    this.event.wyswietlInfo('info', 'Usunięto newsa');
                }

            )
        }
    )
     document.getElementById('closeUsunTresc').click();
 }

 idDeleteNews(id){
    this.idGroup = id;
 }

 deleteGrupa(){ 
    const json = JSON.stringify({
        'id': this.idGroup
    })
    this.CmsService.post('news/deleteGroupNews.php', json).subscribe(
        response => {
            let grupa = 'news/newsGroup.php'; 
            this.CmsService.get(grupa).subscribe(
                response => {
                    this.grupaNewsow = response;
                    document.getElementById('closeGrupa').click();
                    this.event.wyswietlInfo('info', 'Usunięto grupę newsa')
                }
            )
        }
    )
 }
}
