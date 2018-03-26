import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CmsService {

  //uri = 'http://127.0.0.1/CMS/src/api/'; //api testowe
  uri = 'http://kumi20.webd.pl/api/cms/'; //api produkcyjne  

  uriUploudImageGallery = 'http://kumi20.webd.pl/api/cms/gallery/uploudImages.php';

  uriGallery = 'http://kumi20.webd.pl/cms/assets/gallery';

  uriNewsImage = 'http://kumi20.webd.pl/api/plik.php';
  sourceImageNews = 'http://kumi20.webd.pl/source/';

  headers:Headers = new Headers;

  constructor(private _http:Http) { 
    this.headers.append('AuthorizationToken',localStorage.getItem('cmsToken'));

  }

  logOn(user, psw){
      const json = JSON.stringify({
          'user': user,
          'psw': psw
      })

      return this._http.post(this.uri + 'loguj.php', json).map(
        response => response.json()
    )
  }


//uniwersalne funkcja pobierajaca
get(uri){
    return this._http.get(this.uri+uri,{headers: this.headers}).map(
        response => response.json()
    )
}

//uniwersalna funkcja zapisujaca
post(uri, json){
    return this._http.post(this.uri+uri,json,{headers: this.headers}).map(
        response => response.json()
    )
}

test(){

    return this._http.get('http://kumi20.webd.pl/api/cms/dekodowanie.php',{headers: this.headers}).map(
        reponse => reponse.json()
    )
}

}


