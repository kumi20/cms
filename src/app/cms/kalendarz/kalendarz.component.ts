import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-kalendarz',
  templateUrl: './kalendarz.component.html',
  styleUrls: ['./kalendarz.component.scss']
})
export class KalendarzComponent implements OnInit {

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
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
        events: [
          {
            title: 'All Day Event',
            start: '2018-09-01'
          },
          {
            title: 'Long Event',
            start: '2018-09-07',
            end: '2018-09-10'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-09-09T16:00:00'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: '2018-09-16T16:00:00'
          },
          {
            title: 'Conference',
            start: '2018-09-11',
            end: '2018-09-13'
          },
          {
            title: 'Meeting',
            start: '2018-09-12T10:30:00',
            end: '2018-09-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2018-09-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2018-09-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2018-09-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2018-09-12T20:00:00'
          },
          {
            title: 'Birthday Party',
            start: '2018-09-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2018-09-28'
          }
        ],
      };
      
  }
    
  klik(date){
      
      let data = new Date(date.date._d);
      let dzien = this.event.formatDay(data.getDate());
      let miesiac = this.event.formatMonth(data.getMonth());
      let rok = data.getFullYear();
      
      let wydarzenie = rok+'-'+miesiac+'-'+dzien;
      console.log('event', wydarzenie);
  }  

}
