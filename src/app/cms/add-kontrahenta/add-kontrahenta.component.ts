import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { kontrahent} from './kontrahent';

@Component({
  selector: 'app-add-kontrahenta',
  templateUrl: './add-kontrahenta.component.html',
  styleUrls: ['./add-kontrahenta.component.scss']
})
export class AddKontrahentaComponent implements OnInit {

  kontrahent: kontrahent = new kontrahent();
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      
      this.route.params.subscribe(params => this.kontrahent.id_kon = parseInt(params['id']));
      if (isNaN(this.kontrahent.id_kon)) this.kontrahent.id_kon = 0;
      
      if(this.kontrahent.id_kon !=0){
          this.event.klepsydraStart();
          this.CmsService.get(`kontrahenci/getKontrahent.php?id=${this.kontrahent.id_kon}`).subscribe(
                response=>{
                    this.kontrahent.nip = response[0].NIP;
                    this.kontrahent.name = response[0].Name;
                    this.kontrahent.street = response[0].Street;
                    this.kontrahent.postcode = response[0].Postcode;
                    this.kontrahent.miejscowosc = response[0].miejscowosc;
                    this.kontrahent.telephone = response[0].telephone;
                    this.kontrahent.email = response[0].email;
                    if(response[0].dostawca == "0") this.kontrahent.dostawca = false;
                    else this.kontrahent.dostawca = true;
                    if(response[0].odbiorca == "0") this.kontrahent.odbiorca = false;
                    else this.kontrahent.odbiorca = true;
                    this.event.klepsydraStop();
                },
                error=>{
                    this.event.wyswietlInfo('error','Błąd pobierania danych');
                    this.event.klepsydraStop();
                }
          )
      }
  }
    
  powrot(){
    window.history.back(); 
  }
    
  zapisz(){
      this.event.klepsydraStart();
      this.CmsService.post(`kontrahenci/postKontrahent.php`,this.kontrahent).subscribe(
        response=>{
            this.event.wyswietlInfo('success','Dodano kontrahenta');
            this.event.klepsydraStop();
            this._route.navigateByUrl('/content-36');
        },
        error=>{
            this.event.wyswietlInfo('error','Błąd zapisu danych');
            this.event.klepsydraStop();
        }
      )
  }    
    
    delete(){
        this.event.klepsydraStart();
        this.CmsService.get(`kontrahenci/putKontrahent.php?id=${this.kontrahent.id_kon}`).subscribe(
            response => {
                this.event.wyswietlInfo('info', 'usunięto kontrahenta');
                this.event.klepsydraStop();
                this._route.navigateByUrl('/content-36');
            },
            error=>{
                this.event.wyswietlInfo('error', 'Błąd zapisu danych');
                this.event.klepsydraStop();
            }
        )
    }

}
