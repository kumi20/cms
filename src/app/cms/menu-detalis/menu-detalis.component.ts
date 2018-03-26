import { Component, OnInit } from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-menu-detalis',
  templateUrl: './menu-detalis.component.html',
  styleUrls: ['./menu-detalis.component.scss']
})
export class MenuDetalisComponent implements OnInit {

  menuParent;
  idMenu;
  selectedMenu;

  constructor(private CmsService: CmsService, private route: ActivatedRoute, private _route: Router, private event: EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.idMenu = parseInt(params['id']));
     
    //pobieram liste wszystkich stron
    this.CmsService.get('menu/getMenuPages.php').subscribe(
        response => {
          this.menuParent = response;
          //pobieram liste stron przypiętych do danego menu
          const json = JSON.stringify({
            'idMenu': this.idMenu
          })
          this.CmsService.post('menu/getSelectedPages.php', json).subscribe(
            response => {
              this.selectedMenu = response;
              this.menuParent.forEach(element => {
      
                  for(let i = 0; i<this.selectedMenu.length; i++){
                    if(element.page_id == this.selectedMenu[i].page_id){ 
                      element.checked = true;
                    }
                  }
      
              });
            },
            error => this.event.wyswietlInfo('error', 'błąd pobieranie menu')
          )
        },
        error => this.event.wyswietlInfo('error','Błąd pobierania menu')
    );
  }

  zapisz(){
    this.selectedMenu.length = 0;
    this.menuParent.forEach(element => {
      if(element.checked) this.selectedMenu.push(element)
    });

    let json = JSON.stringify({
      'menuNode': this.selectedMenu 
    });

    let uri = `menu/saveMenu.php?idMenu=${this.idMenu}`;
    this.CmsService.post(uri, json).subscribe(
      response =>{
        if(response.kod<0) this.event.wyswietlInfo('error', response.opis);
        else if (response.kod == 0) this.event.wyswietlInfo('success', 'Zapisano menu');
      }
    )
  }

  powrot(){
    window.history.back();
  }

}
