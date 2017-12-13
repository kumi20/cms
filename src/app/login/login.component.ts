import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { CmsService } from '../cms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login;
  errorLogin: string = '';

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router) { }

  ngOnInit() {
    document.getElementById('loginForm').click();
    this.login = new FormGroup({
        user: new FormControl('', Validators.required),
        psw: new FormControl('', Validators.required)
    })
  }

  loginUser(values){
      if (values.user == '' || values.psw == '') this.errorLogin = 'Wprowadź nazwę i hasło uytkownika';

      this.CmsService.logOn(values.user, values.psw).subscribe(
          response => {
              if (response.kod != 0 ) this.errorLogin = response.opis;
              else {
                  localStorage.setItem('cmsToken', response.id_user);
                  localStorage.setItem('user_nameCms', response.user_name);
                  document.getElementById('loginClose').click();
                  this._route.navigateByUrl('content');
              }
          }
      )
  }

}
