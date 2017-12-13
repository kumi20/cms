import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-dodaj-tresc',
  templateUrl: './dodaj-tresc.component.html',
  styleUrls: ['./dodaj-tresc.component.scss']
})
export class DodajTrescComponent implements OnInit, OnDestroy {

  tytul: string = '';
  tresc: string = '';
  errorTytul: boolean = false;
  errorText: string = 'Podaj tytuł';
  idTresc: number = 0;


  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {

      this.route.params.subscribe(params => this.idTresc = parseInt(params['id']));
      if (!isNaN(this.idTresc)){
          this.CmsService.getDetTresci(this.idTresc).subscribe(
              response => {
                  this.event.klepsydraStart();
                  this.tytul = response[0].static_name;
                  this.tresc = response[0].static_content;
                  this.event.klepsydraStop();
              },
              error => this.event.klepsydraStop()
          )
      }

  }
  
  ngOnDestroy() {
    this.tytul = '';
    this.tresc = '';
  }

  powrot(){
    window.history.back();
  }

  zapisz(){
      this.CmsService.addTresc(this.tytul, this.tresc, this.idTresc).subscribe(
          response => {
              if (response.kod == -1 ){
                  this.errorTytul = true;
                  this.errorText = response.opis;
              }
              else{
                  this._route.navigateByUrl('/content-24');
                  this.event.wyswietlInfo('success', 'Dodano treść')
              }
          }
      )
  }
}
