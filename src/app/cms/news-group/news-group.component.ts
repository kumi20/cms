import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-news-group',
  templateUrl: './news-group.component.html',
  styleUrls: ['./news-group.component.scss']
})
export class NewsGroupComponent implements OnInit {

  nazwa: string = '';
  liczba: number = 0;
  idGroup: number = 0;
  
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.route.params.subscribe(params => this.idGroup = parseInt(params['id']));
      if (isNaN(this.idGroup)) this.idGroup = 0;
      if (this.idGroup != 0 ){
        const json = JSON.stringify({
            'id':this.idGroup
          })
          let uri = 'news/getDetGroup.php';
          this.CmsService.post(uri,json).subscribe(
              response => {
                  this.event.klepsydraStart();
                  this.nazwa = response[0].news_group_name;
                  this.liczba = response[0].news_group_perpage;
                  this.event.klepsydraStop();
              },
              error => this.event.klepsydraStop()

          )
      }
  }

  powrot(){
      history.back();
  }

  zapisz(){
    const json = JSON.stringify({
        'news_group_name': this.nazwa,
        'news_group_perpage': this.liczba,
        'idGroup': this.idGroup
    })

      this.CmsService.post('news/addGroup.php', json).subscribe(
          response => {
              this._route.navigateByUrl('/content-5');
                this.event.wyswietlInfo('success', 'Dodano nową grupę newsa');
            }

      )
  }
}
