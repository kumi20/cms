import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-kpir-statistic',
  templateUrl: './kpir-statistic.component.html',
  styleUrls: ['./kpir-statistic.component.scss']
})
export class KpirStatisticComponent implements OnInit {
    
  dataChart: number[] = []    
  chartDatasets:Array<any> = []; 
  yearStatistic: any = '';
  przychod: number[] = [];
  rozchod: number[] = [];    
  label;    
  actualYear;    
  year;    

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.actualYear = String(new Date().getFullYear());
      this.year = this.CmsService.year;
      this.getStatistic();      
  }
    
    public chartType:string = 'bar';
        
    chartHovered(event){}

    public chartLabels:Array<any> = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];

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
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
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
    
    changeYear(event){        
        this.actualYear = event.value;
        this.getStatistic();
    }
    
    getStatistic(){
        this.event.klepsydraStart();
      this.CmsService.get(`kpir-statistic/getList.php?year=${this.actualYear}`).subscribe(
            response=>{
                this.event.klepsydraStop();
                if (response != null) this.yearStatistic = response;
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', 'Błąd pobierania danych');
            }
      )
      
      this.CmsService.get(`kpir-statistic/getMounth.php?year=${this.actualYear}`).subscribe(
            response=>{
                this.event.klepsydraStop();
                this.przychod.length = 0;
                this.rozchod.length = 0;
                response.forEach(el=>{
                    this.przychod.push(Number(el.razem_przychod));
                })
                
                this.CmsService.get(`kpir-statistic/getRozchod.php?year=${this.actualYear}`).subscribe(
                    response =>{
                        response.forEach(el=>{
                            this.rozchod.push(Number(el.razem_przychod));
                        })
                        
                        this.chartDatasets = [
                            {data: this.przychod, label: 'Przychód'},
                            {data: this.rozchod, label: 'koszt uzyskania przychodu'}
                        ];
                    }
                )
                
                //if (response != null) this.yearStatistic = response;
            },
            error=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', 'Błąd pobierania danych');
            }
      )
    }

}
