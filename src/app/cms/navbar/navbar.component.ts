import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string = '';
  menu;

  constructor(private _route: Router, private CmsService: CmsService) { }

  ngOnInit() {
      this.userName = localStorage.getItem('user_nameCms');
      let uri = 'getMenu.php';
      this.CmsService.get(uri).subscribe(
          response => {console.log(response); this.menu = response}
      )
  }

  wyloguj(){
    localStorage.removeItem('cmsToken');
    localStorage.removeItem('user_nameCms');
    this._route.navigateByUrl('cms');
  }

  closeMenu(id){
      console.log('menuId',id)
      document.getElementById('closeMenu').click();
  }
}
