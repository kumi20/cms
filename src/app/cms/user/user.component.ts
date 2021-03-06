import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users;
  idUser;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
    this.event.klepsydraStart();
      this.CmsService.get('user/getUser.php').subscribe(
          response => {
              this.users = response;
              this.event.klepsydraStop();
          },
          error => this.event.klepsydraStop()
      )
  }

  edytuj(id){
      this._route.navigateByUrl('/dodajUzytkownika/'+id);
  }

  idDelete(id){
        this.idUser = id;
  }

  deleteTresc(){
    const json = JSON.stringify({
        'id': this.idUser,
    })
        this.CmsService.post('user/deleteUser.php', json).subscribe(
            response => {
                this.ngOnInit();
                document.getElementById('closeUsunTresc').click();
                this.event.wyswietlInfo('info', 'Usunięto uytkownika');
            }
        )
  }
}
