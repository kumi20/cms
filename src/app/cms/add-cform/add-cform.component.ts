import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { cform, adresat } from './cform';

@Component({
  selector: 'app-add-cform',
  templateUrl: './add-cform.component.html',
  styleUrls: ['./add-cform.component.scss']
})
export class AddCformComponent implements OnInit {

  id;    
  cform: cform = new cform();
  cformUser;
  addresatShow: boolean = false;
  adresat: adresat = new adresat();    
    
  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.route.params.subscribe(params => this.id = parseInt(params['id']));
      if (isNaN(this.id)) this.id = 0;
      
      this.event.klepsydraStart();
      this.CmsService.get(`cform/getListAdresaci.php`).subscribe(
        response =>{
            this.cformUser = response;
            this.event.klepsydraStop();
            if(this.id !=0){
                this.event.klepsydraStart();
                this.CmsService.get(`cform/getCform.php?id=${this.id}`).subscribe(
                    response =>{
                        this.cform.name = response[0].cform_name;
                        response.forEach(el=>{
                            for(let i = 0; i < this.cformUser.length; i++){
                                if (this.cformUser[i].cform_user_id == el.cform_user_id) this.cformUser[i].checked = true;
                            }
                        })
                        this.event.klepsydraStop();
                    },
                    error =>{
                        this.event.klepsydraStop();
                        this.event.wyswietlInfo('error', 'Błąd pobierania danych');
                    }
                )
            }
        },
        error=>{
            this.event.klepsydraStop();
            this.event.wyswietlInfo('error',"Błąd pobierania danych");    
        }  
      )
  }
    
    showAddAdresat(){
        this.addresatShow = true;
    }
    
    back(){
        history.back();
    }
    
    save(){
        this.cformUser.forEach(el=>{
            if(el.checked) this.cform.adresaci.push(el.cform_user_id)
        })
        
        this.event.klepsydraStart();
        this.CmsService.post(`cform/postCform.php?id=${this.id}`,this.cform).subscribe(
            response =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('success', 'Dodano nowy formularz');
                this._route.navigateByUrl('/content-9');
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error','Błąd zapisu danych');
            }
        )
    }
    
    delete(id){
        this.event.klepsydraStart();
        this.CmsService.get(`cform/deleteAdresat.php?id=${id}`).subscribe(
            response =>{
                this.event.klepsydraStop();
                    this.event.wyswietlInfo('info', 'Usunięto adresata');
                    this.CmsService.get(`cform/getListAdresaci.php`).subscribe(
                        response =>{
                            this.cformUser = response;
                            this.event.klepsydraStop();
                        },
                        error=>{
                            this.event.klepsydraStop();
                            this.event.wyswietlInfo('error',"Błąd pobierania danych");    
                        }  
                      )   
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error',"Błąd pobierania danych");
            }
        )
    }
    
    addAdresat(){
        if(this.adresat.name == '' || this.adresat.email == '') this.event.wyswietlInfo('info', 'Uzupełnij nazwę i email');
        else{
            this.event.klepsydraStart();
            this.CmsService.post(`cform/postAdresat.php`, this.adresat).subscribe(
                response =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('success', 'Dodano nowego adresata');
                    this.CmsService.get(`cform/getListAdresaci.php`).subscribe(
                        response =>{
                            this.cformUser = response;
                            this.event.klepsydraStop();
                        },
                        error=>{
                            this.event.klepsydraStop();
                            this.event.wyswietlInfo('error',"Błąd pobierania danych");    
                        }  
                      )   
                    this.cancel();
                },
                error =>{
                    this.event.klepsydraStop();
                    this.event.wyswietlInfo('error',"Błąd zapisu danych"); 
                }
            )
        }
    }
    
    cancel(){
        this.addresatShow = false;
        this.adresat.email = '';
        this.adresat.name = '';
        this.adresat.stanowisko = '';
        this.adresat.id = 0;
    }
    
    editAdresat(id){
        this.adresat.id = id;
        this.event.klepsydraStart();
        this.CmsService.get(`cform/getAdresat.php?id=${id}`).subscribe(
            response =>{
                console.log('response', response);
                this.adresat.name = response[0].cform_user_name;
                this.adresat.email = response[0].cform_user_email;
                this.adresat.stanowisko = response[0].cform_user_title;
                this.addresatShow = true;
                this.event.klepsydraStop();
            },
            error =>{
                this.event.klepsydraStop();
                this.event.wyswietlInfo('error',"Błąd pobierania danych"); 
            }
        )
    }

}
