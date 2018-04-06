import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { IMyDpOptions } from 'mydatepicker'; 
import { kalendarz } from './kalendarz';

@Component({
  selector: 'app-kalendarz',
  templateUrl: './kalendarz.component.html',
  styleUrls: ['./kalendarz.component.scss']
})
export class KalendarzComponent implements OnInit {

  @ViewChild('basicModal') basicModal;
  @ViewChild('fullcalendar') fullcalendar;
    
  calendarOptions: Options;
  events;
  dataEvent;
  timeStartEvent: string = '00:00';
  timeEndEvent: string = '00:00';   
  dataEndEvent;
  kalendarzEvent: kalendarz = new kalendarz();    
    
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
    
    save(){
        if(this.dataEndEvent==null) this.event.wyswietlInfo('error','podaj datę końca wydarzenia');
        else{
            this.kalendarzEvent.start = this.dataEvent + ' '+this.timeStartEvent;
            this.kalendarzEvent.endEvent = this.dataEndEvent.formatted + ' '+this.timeEndEvent; 
            this.event.klepsydraStart();
            this.CmsService.post(`callendar/postEvent.php`, this.kalendarzEvent).subscribe(
                response =>{
                    this.event.wyswietlInfo('success','dodano wydarzenie');
                    this.kalendarzEvent.id = response.id_event;
                    this.event.klepsydraStop();
                    this.fullcalendar.fullCalendar('renderEvent', this.kalendarzEvent);
                    this.fullcalendar.fullCalendar('rerenderEvents');
                    this.basicModal.hide();                    
                },
                error =>{
                    this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                    this.event.klepsydraStop();
                }
            )
        }
        
       
        
    }
    
    
    eventClick(event){
         
        try{
            this.dataEvent = event.event.start._i.substr(0,10);
            this.dataEndEvent = {formatted: event.event.end._i.substr(0,10)};
            this.timeStartEvent = event.event.start._i.substr(11,15);
            this.timeEndEvent = event.event.end._i.substr(11,15);
        }
        catch(e){
            let dataStart = new Date(event.event.start._i[0],event.event.start._i[1],event.event.start._i[2],event.event.start._i[3],event.event.start._i[4],event.event.start._i[5],event.event.start._i[6]);
        
            let dzien = this.event.formatDay(dataStart.getDate());
            let miesiac = this.event.formatMonth(dataStart.getMonth());
            let rok = dataStart.getFullYear();
            let hours = dataStart.getHours();
            let minutes = dataStart.getMinutes();

            this.dataEvent = rok+'-'+miesiac+'-'+dzien;
            this.dataEvent = this.dataEvent;

            this.timeStartEvent = hours+":"+minutes;
            this.kalendarzEvent.start = this.dataEvent + ' '+this.timeStartEvent;
            let dataEnd = new Date(event.event.end._i[0],event.event.end._i[1],event.event.end._i[2],event.event.end._i[3],event.event.end._i[4],event.event.end._i[5],event.event.end._i[6]);
            dzien = this.event.formatDay(dataEnd.getDate());
            miesiac = this.event.formatMonth(dataEnd.getMonth());
            rok = dataEnd.getFullYear();
            hours = dataEnd.getHours();
            minutes = dataEnd.getMinutes();        

            this.dataEvent = rok+'-'+miesiac+'-'+dzien;
            this.dataEndEvent = {'formatted': this.dataEvent}; 
            this.timeEndEvent = hours+":"+minutes;
            this.kalendarzEvent.endEvent = this.dataEndEvent.formatted + ' '+this.timeEndEvent;
        }
        this.kalendarzEvent.id = event.event.id;
        this.kalendarzEvent.title = event.event.title;
        this.basicModal.show();
       
    }
    
    updateEvent(event){
        let dataStart = new Date(event.event.start._i[0],event.event.start._i[1],event.event.start._i[2],event.event.start._i[3],event.event.start._i[4],event.event.start._i[5],event.event.start._i[6]);
        
        let dzien = this.event.formatDay(dataStart.getDate());
        let miesiac = this.event.formatMonth(dataStart.getMonth());
        let rok = dataStart.getFullYear();
        let hours = dataStart.getHours();
        let minutes = dataStart.getMinutes();

        this.dataEvent = rok+'-'+miesiac+'-'+dzien;
        this.dataEvent = this.dataEvent;
        
        this.timeStartEvent = hours+":"+minutes;
        this.kalendarzEvent.start = this.dataEvent + ' '+this.timeStartEvent;
        
        let dataEnd = new Date(event.event.end._i[0],event.event.end._i[1],event.event.end._i[2],event.event.end._i[3],event.event.end._i[4],event.event.end._i[5],event.event.end._i[6]);
        dzien = this.event.formatDay(dataEnd.getDate());
        miesiac = this.event.formatMonth(dataEnd.getMonth());
        rok = dataEnd.getFullYear();
        hours = dataEnd.getHours();
        minutes = dataEnd.getMinutes();        
        
        this.dataEvent = rok+'-'+miesiac+'-'+dzien;
        this.dataEndEvent = {'formatted': this.dataEvent}; 
        this.timeEndEvent = hours+":"+minutes;
        this.kalendarzEvent.endEvent = this.dataEndEvent.formatted + ' '+this.timeEndEvent;
        
        this.kalendarzEvent.id = event.event.id;
        this.kalendarzEvent.title = event.event.title;
        
        this.event.klepsydraStart();
        this.CmsService.post(`callendar/postEvent.php`, this.kalendarzEvent).subscribe(
            response =>{
                this.event.wyswietlInfo('success', 'Zaktualizowano wydarzenie');
                this.event.klepsydraStop();
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error','Błąd zapisu danych');
            }
        )
    }
    
    delete(){
        this.event.klepsydraStart();
        this.CmsService.get(`callendar/deleteEvent.php?id=${this.kalendarzEvent.id}`).subscribe(
            response=>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('info', 'Usunięto wydarzenie');
                this.fullcalendar.fullCalendar('removeEvents',this.kalendarzEvent.id);
                this.clearEvent();
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
            }
        )
    }  
    
    clearEvent(){
        this.kalendarzEvent.id = 0;
        this.kalendarzEvent.endEvent = '';
        this.kalendarzEvent.start = '';
        this.kalendarzEvent.title = '';
        this.timeStartEvent = '';
        this.timeEndEvent = '';
    }

}
