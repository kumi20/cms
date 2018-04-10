import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-cform',
  templateUrl: './cform.component.html',
  styleUrls: ['./cform.component.scss'],
  inputs: ['idtresci','pageElement']
})
export class CformTemplateComponent implements OnInit {

  idtresci;
  pageElement;
  cform;    
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.cform = new FormGroup({
            name: new FormControl(""),
            email: new FormControl("", Validators.required),
            subject: new FormControl(""),
            message: new FormControl("", Validators.required)
      })
  }
    
    send(event){
        if (event.email == '' || event.message == '') this.event.wyswietlInfo('info','Proszę podać email i treśc wiadomości');
        else{
            this.event.klepsydraStart();
            this.CmsService.post(`template/cform/sendMail.php?id=${this.idtresci}`, event).subscribe(
                response=>{
                    this.event.wyswietlInfo('success', 'Wiadomość została wysłana');
                    this.cform.controls['name'].setValue("");
                    this.cform.controls['email'].setValue("");
                    this.cform.controls['message'].setValue("");
                    this.cform.controls['subject'].setValue("");
                    this.event.klepsydraStop();
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error','Błąd wysyłania wiadomości');
                }
            )
        }
    }    

}
