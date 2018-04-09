import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { pool } from './pool';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-add-pool',
  templateUrl: './add-pool.component.html',
  styleUrls: ['./add-pool.component.scss']
})
export class AddPoolComponent implements OnInit {

  id;    
  pool: pool = new pool();
  countAnswer: number = 0;    

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
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.route.params.subscribe(params => this.id = parseInt(params['id']));
      if (isNaN(this.id)) this.id = 0;
      
      if(this.id != 0){
          this.event.klepsydraStart();
          this.CmsService.get(`pool/getPool.php?id=${this.id}`).subscribe(
            response=>{
                this.event.klepsydraStop();
                this.pool.name = response[0].poll_name;
                this.pool.stardate = {formatted: response[0].poll_startdate};
                this.pool.enddate = {formatted: response[0].poll_enddate};
                response.forEach(el=>{
                    this.countAnswer += Number(el.poll_vote_votecount);
                })
                response.forEach(el=>{
                    this.pool.questions.push({pool_vote_name: el.poll_vote_name, pool_procent: Number(el.poll_vote_votecount/this.countAnswer)*100, poll_vote_votecount: el.poll_vote_votecount});
                })
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', 'Błąd pobierania danych');
            }  
          )
      }
  }
    
  back(){
      history.back();
  }

  save(){
      if (this.pool.enddate == '' || this.pool.enddate == null || this.pool.stardate == '' || this.pool.stardate == null) this.event.wyswietlInfo('info','Uzupełnij start i koniec publikacji');
      else{
           
          this.pool.stardate = (<any>this.pool.stardate).formatted;
          this.pool.enddate = (<any>this.pool.enddate).formatted;  
          this.event.klepsydraStart();
          this.CmsService.post(`pool/postPool.php?id=${this.id}`, this.pool).subscribe(
            response=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('success', 'Dodano nową sondę');
                this._route.navigateByUrl('/content-12');
            },
              error=>{
                  this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                  this.event.klepsydraStop();
              }
          )
      }
      
  }   
    
    addAnswer(){
        this.pool.questions.push({pool_vote_name: '',pool_procent: 0, poll_vote_votecount: 0});
    }
    
    delete(id){
        this.pool.questions.splice(id,1);
    }
}
