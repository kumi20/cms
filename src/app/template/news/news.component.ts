import { Component, OnInit, Input } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponentView implements OnInit {

  tresc;
  idtresci;
  pageElement;
  newsList;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {

    this.event.klepsydraStart();
    const json = JSON.stringify({
      'id':this.idtresci
  })
     this.CmsService.post('template/news/getNews.php', json).subscribe(
         response => {
           if(response != null) this.newsList = response;
            console.log('newsy', response)
            this.event.klepsydraStop();
        },
        error => this.event.klepsydraStop()
     )
  }

}
