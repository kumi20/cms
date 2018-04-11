import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { SqueezeBoxModule } from '../../typescripts/pro';
import { news } from './news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponentView implements OnInit {

  tresc;
  idtresci;
  pageElement;
  newsList: any[] = [];
  newsGroupName: string = ''; 
  firstNews: any[] = [];
  readArticle: boolean = false; 
  news: news = new news();
  page;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {

    this.event.klepsydraStart();

     this.CmsService.getTemplate(`template/news/getNews.php?id=${this.idtresci}`).subscribe(
         response => {
           if(response != null) {
               this.newsList = response;  
               this.firstNews.push(response[0]);
               this.newsList.splice(0,1);
               this.newsGroupName= response[0].news_group_name; 
           }
            this.event.klepsydraStop();
        },
        error => this.event.klepsydraStop()
     )
  }
    
    
  showArticle(id){      
      this.event.klepsydraStart();
      this.CmsService.getTemplate(`template/news/getNewsId.php?id=${id}`).subscribe(
            response=>{
                this.news.news_content = response[0].news_content;
                this.news.news_lead = response[0].news_lead;
                this.news.news_lead_img = response[0].news_lead_img;
                this.news.news_name = response[0].news_name;
                this.news.news_pub_date = response[0].news_pub_date;
                this.news.news_views = response[0].news_views;
                this.event.klepsydraStop();
                this.readArticle = true;
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error','Błąd pobierania danych');
            }
      )
  }  
    
  back(){
      this.readArticle = false;
  } 
    
  pageChanged(page){
    //this._route.navigate(['/content-24',page]);
    return page;
  }
}
