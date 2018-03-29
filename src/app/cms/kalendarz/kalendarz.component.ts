import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { IMyDpOptions } from 'mydatepicker'; 

@Component({
  selector: 'app-kalendarz',
  templateUrl: './kalendarz.component.html',
  styleUrls: ['./kalendarz.component.scss']
})
export class KalendarzComponent implements OnInit {

  calendarOptions: Options;
  events;
  dataEvent;
  timeStartEvent: string = '00:00';
  timeEndEvent: string = '00:00';   
  dataEndEvent;
  nameEvent;
    
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
    
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.getListEvents();
      
      
      
  }
    
  setDateEvent(date){
      
      let data = new Date(date.date._d);
      let dzien = this.event.formatDay(data.getDate());
      let miesiac = this.event.formatMonth(data.getMonth());
      let rok = data.getFullYear();
           
      this.dataEvent = rok+'-'+miesiac+'-'+dzien;
      this.dataEndEvent = {'formatted': this.dataEvent};
  } 
    
  getListEvents(){
      this.event.klepsydraStart();
      this.CmsService.get(`callendar/getList.php`).subscribe(
        response =>{
            this.events = response;
            
            this.calendarOptions = {
                editable: true,
                eventLimit: false,
                firstDay: 1,
                monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec','Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
                dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa','Czwartek', 'Piątek', 'Sobota'],  
                dayNamesShort: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],  
                monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],  
                buttonText: {
                      today:    'dzisiaj',
                      month:    'miesiąc',
                      week:     'tydzień',
                      day:      'dzień'
                    }, 
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay'
                },
                events: this.events
              };
            this.event.klepsydraStop();
        },
        error =>{
            this.event.wyswietlInfo('error', 'Błąd pobierania danych');
            this.event.klepsydraStop();
        }  
      )
  } 
    
    test(){
        console.log('czas startu', this.timeStartEvent);
    }

}
