import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  login: string = '';
  haslo: string = '';
  nazwiskoImie: string = '';
  email: string = '';
  status: string = '1';

  idUser: number = 0;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
      this.route.params.subscribe(params => this.idUser = parseInt(params['id']));
      
      if( isNaN(this.idUser)) this.idUser = 0;
      else{
        const json = JSON.stringify({
            'id': this.idUser
        })
          this.event.klepsydraStart();
          this.CmsService.post('user/getDetUser.php', json).subscribe(
              response => {
                  this.login = response[0].user_login;
                  this.haslo = response[0].user_password;
                  this.nazwiskoImie = response[0].user_name;
                  this.email = response[0].user_email;
                  this.status = response[0].user_status_id;
                  this.event.klepsydraStop()
              },
              error => this.event.klepsydraStop()
          )
      }
  }

  zapisz(){

    const json = JSON.stringify({
        'user_login': this.login,
        'user_password': this.haslo,
        'user_name':this.nazwiskoImie,
        'user_status':this.status,
        'user_email':this.email,
        'user_id':this.idUser,
    })

    this.CmsService.post('user/addUser.php', json).subscribe(
        response => {
            this._route.navigateByUrl('/content-1');
            this.event.wyswietlInfo('success', 'Dodano nowego uytkownika');
        }
    )
  }

  powrot(){
      history.back();
  }
}
