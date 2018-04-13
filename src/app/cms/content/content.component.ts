import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  news: any[] = [];
  static: any[] = []; 
  gallery: any[] = [];    
  poll: any[] = [];    
  fiveTopNews: any[] = [];    
  dataChart: number[] = []    
  pollVoteAnswer: any[] = [];    
  chartDatasets:Array<any> = [];    

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.event.klepsydraStart();      
      this.CmsService.get(`content/getNews.php`).subscribe(
        response=>{
            if(response !=null) this.news = response;            
            
            if(response.length > 5){
                for(let i = 0; i< 5; i++){
                    this.fiveTopNews.push(response[i]);
                }
            }
            else this.fiveTopNews = this.news;
            
            this.fiveTopNews.forEach(el=>{
                this.chartDatasets.push({data: [Number(el.news_views)],label: el.news_name});
            })
            
            this.event.klepsydraStop();
        },
        error=>{
            this.event.wyswietlInfo('error','Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
      
      this.event.klepsydraStart();      
      this.CmsService.get(`content/getStatic.php`).subscribe(
        response=>{
            if(response !=null) this.static = response;
            this.event.klepsydraStop();
        },
        error=>{
            this.event.wyswietlInfo('error','Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
      
      
      this.event.klepsydraStart();      
      this.CmsService.get(`content/getGallery.php`).subscribe(
        response=>{
            if(response !=null) this.gallery = response;
            this.event.klepsydraStop();
        },
        error=>{
            this.event.wyswietlInfo('error','Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
      
      this.event.klepsydraStart();      
      this.CmsService.get(`content/getPoll.php`).subscribe(
        response=>{
            if(response !=null) this.poll = response;
            this.event.klepsydraStop();
        },
        error=>{
            this.event.wyswietlInfo('error','Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
  }
    
    public chartType:string = 'bar';
        
    chartHovered(event){}

    public chartLabels:Array<any> = ["Newsy"];

    public chartColors:Array<any> = [
        {
            backgroundColor: 'rgba(220,220,220,0.2)',
            fontColor: '#fff',
            borderColor: 'rgba(220,220,220,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(220,220,220,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(220,220,220,1)'
        },
        {
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        },
        {
            backgroundColor: '#F7464A',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        }
    ];
    
     public chartOptions:any = { 
        responsive: true,
        legend: {
            labels:{
                fontColor: 'white'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",

                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",

                }
            }]
        }
    }
}
