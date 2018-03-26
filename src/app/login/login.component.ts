import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { CmsService } from '../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelper} from 'angular2-jwt'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login;
  errorLogin: string = '';
  jwtHelper: JwtHelper = new JwtHelper();

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
              let tokenExpDate = this.jwtHelper.decodeToken(response);
              if (tokenExpDate.kod != 0 ) this.errorLogin = tokenExpDate.opis;
              else {
                  localStorage.setItem('cmsToken', response);
                  localStorage.setItem('user_nameCms', tokenExpDate.name);
                  document.getElementById('loginClose').click();
                  this._route.navigateByUrl('content');
              }
          }
      )
  }

}
