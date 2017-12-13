import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers} from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CmsService {

  uri = 'http://kumi20.webd.pl/api/cms/';
  userId = localStorage.getItem('cmsToken');
  headers:Headers = new Headers;    

  constructor(private _http:Http) { 
    this.headers.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJrdW1pMjAud2ViZC5wbCIsInVzZXJJZCI6Ik1nPT0iLCJuYW1lIjoiSmFrdWIgS3VtaVx1MDExOWdhIn0.gHDwXY0MawQ4ZFwqDFcJQ66WFrp1EWT8zKUfTHuT-9o");
    this.headers.append("Content-Type", "application/json");
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

  getMenu(){
      return this._http.get(this.uri + 'getMenu.php').map(
          response => response.json()
      )
  }

  //treść 
  getTresc(){
      return this._http.get(this.uri + 'static/getTresc.php').map(
          response => response.json()
      )
  }

  deleteTresc(id){
      const json = JSON.stringify({
          'id': id
      })

      return this._http.post(this.uri + 'static/deletetresc.php', json).map(
          response => response.json()
      )
  }

  addTresc(tytul, tresc, idTresci){
      const json = JSON.stringify({
          'tytul': tytul,
          'tresc': tresc,
          'idUser': this.userId,
          'idTresci': idTresci
      })

      return this._http.post(this.uri + 'static/addTresc.php', json).map(
          response => response.json()
      )
  }

  getDetTresci(id){
      const json = JSON.stringify({
          'id':id
      })

      return this._http.post(this.uri + 'static/getDetTresci.php', json).map(
          response => response.json()
      )
  }

  getPageMenu(parent, level){
      const json = JSON.stringify({
        'idParent': parent,
        'idLevel': level
      })

      return this._http.post(this.uri + 'page/getMenu.php', json).map(
          response => response.json()
      )
  }

  //------------------------------------------------------------------
  //newsy
  getNewsy(){
      return this._http.get(this.uri + 'news/getNewsy.php').map(
          response => response.json()
      )
  }

  addNews(czyPublikowac,news_pub_date,news_name,news_lead_img,news_lead,news_content,idNewsa, grupa){
      const json = JSON.stringify({
          'idUser': this.userId,
          'czyPublikowac': czyPublikowac,
          'news_pub_date': news_pub_date,
          'news_name': news_name,
          'news_lead_img': news_lead_img,
          'news_lead':  news_lead,
          'news_content': news_content,
          'idNewsa': idNewsa,
          'grupa': grupa 
      })

      return this._http.post(this.uri + 'news/addNews.php', json).map(
          response => response.json()
      )
  }

  getDetNews(id){
      const json = JSON.stringify({
          'id':id
      })

      return this._http.post(this.uri + 'news/getDetNews.php', json).map(
          response => response.json()
      )
  }

  getGroupNews(){
      return this._http.get(this.uri + 'news/newsGroup.php').map(
          response => response.json()
      )
  }

  addGroupNews(name,perpage,id){
        const json = JSON.stringify({
            'news_group_name': name,
            'news_group_perpage': perpage,
            'idGroup': id
        })

        return this._http.post(this.uri + 'news/addGroup.php', json).map(
            response => response.json()
        )
  }

  getDetGroupNews(id){
      const json = JSON.stringify({
            'id':id
      })

      return this._http.post(this.uri + 'news/getDetGroup.php', json).map(
          response => response.json()
      )
  }

  deleteNews(id){
      const json = JSON.stringify({
          'id': id
      })

      return this._http.post(this.uri + 'news/deleteNews.php', json).map(
          response => response.json()
      )
  }

  deleteGroupNews(id){
      const json = JSON.stringify({
          'id': id
      })

      return this._http.post(this.uri + 'news/deleteGroupNews.php', json).map(
            response => response.json()
      )
  }

  getGrupaNewsa(id){
        const json = JSON.stringify({
            'id': id
        })

        return this._http.post(this.uri + 'news/getGrupaNewsa.php', json).map(
            response => response.json()
        )
  }

  //---------------------------------------------------------------------------
  //user

  getUser(){
      return this._http.get(this.uri + 'user/getUser.php').map(
          response => response.json()
      )
  }

  addUser(login, haslo, name, email, status, id){
        const json = JSON.stringify({
            'user_login': login,
            'user_password': haslo,
            'user_name':name,
            'user_status':status,
            'user_email':email,
            'user_id':id,
            'idUser': this.userId
        })

        return this._http.post(this.uri + 'user/addUser.php', json).map(
            response => response.json()
        )
  }

  getDetUser(id){
      const json = JSON.stringify({
          'id': id
      })

      return this._http.post(this.uri + 'user/getDetUser.php', json).map(
          response => response.json()
      )
  }

  deleteUzytkownik(id){
      const json = JSON.stringify({
          'id': id,
          'idUser': this.userId
      })

      return this._http.post(this.uri + 'user/deleteUser.php', json).map(
          response => response.json()
      )
  }

  //----------------------------------------------------------------------
  // page

  getContainer(){
      return this._http.get(this.uri + 'page/getContainer.php').map(
          response => response.json()
      )
  }

  getPages(){
      return this._http.get(this.uri + 'page/getPages.php').map(
          response => response.json()
      )
  }

  getContainerElement(idKontenera, idPage){
      const json = JSON.stringify({
          'idContainer': idKontenera,
          'idPage': idPage
      })

      return this._http.post(this.uri + 'page/getContainerElement.php', json).map(
          response => response.json()
      )
  }

  getModulesAddPage(){
      return this._http.get(this.uri + 'page/getModule.php').map(
          response => response.json()
      )
  }

  getModelView(id){
      const json = JSON.stringify({
          'idModel': id
      })

      return this._http.post(this.uri + 'page/getModelView.php', json).map(
          response => response.json()
      )
  }

  deleteelementPage(id){
      const json = JSON.stringify({
          'id': id
      })

      return this._http.post(this.uri + 'page/deleteElementPages.php', json).map(
          response => response.json()
      )
  }

  elementUP(idElement, idKontener){
        const json = JSON.stringify({
            'idPageElement': idElement,
            'idKontenera': idKontener
        })

        return this._http.post(this.uri + 'page/positionElementUp.php', json).map(
            response => response.json()
        )
  }

  elementDown(idElement, idKontener){
      const json = JSON.stringify({
        'idPageElement': idElement,
        'idKontenera': idKontener
      })

      return this._http.post(this.uri + 'page/positionElementDown.php', json).map(
          response => response.json()
      )
  }

  usunKontener(id){
      const json = JSON.stringify({
          'id':id
      })

      return this._http.post(this.uri + 'page/deleteKontener.php', json).map(
          response => response.json()
      )
  }

  addKontainer(name){
      const json = JSON.stringify({
          'name':name
      })

      return this._http.post(this.uri + 'page/addKontainer.php', json).map(
          response => response.json()
      )
  }

  addPage(name, number){
      const json = JSON.stringify({
          'number': number,
          'name': name
      })

      return this._http.post(this.uri + 'page/addPages.php', json).map(
          response => response.json()
      )
  }

  deletePages(id){
      const json = JSON.stringify({
          'id': id
      })

      return this._http.post(this.uri + 'page/deletePages.php', json).map(
          response => response.json()
      )
  }

  pageDown(id){
      const json = JSON.stringify({
          'idPageElement':id
      })

      return this._http.post(this.uri + 'page/positionPagesDown.php',json).map(
          response => response.json()
      )
  }

  pageUp(id){
    const json = JSON.stringify({
        'idPageElement':id
    })

    return this._http.post(this.uri + 'page/positionPagesUp.php',json).map(
        response => response.json()
    )
  }

  pageNodeDown(id){
    const json = JSON.stringify({
        'idPageElement':id
    })

    return this._http.post(this.uri + 'page/pageNodeDown.php',json).map(
        response => response.json()
    )
  }

  pageNodeUp(id){
      const json = JSON.stringify({
          'idPageElement':id
      })

      return this._http.post(this.uri + 'page/pageNodeUp.php', json).map(
          response => response.json()
      )
  }

  addNewElementPage(elementModel){
      const json = JSON.stringify({
          'elementModel': elementModel
      })

      return this._http.post(this.uri + 'page/addElementPages.php',json).map(
          response => response.json()
      )
  }

  changeNamePage(id, name){
      const json = JSON.stringify({
          'name': name,
          'id': id
      })

      return this._http.post(this.uri + 'page/updateNamePages.php', json).map(
          response => response.json()
      )
  }
  //template
getStatic(id){
    const json = JSON.stringify({
        'id':id
    })

    return this._http.post(this.uri + 'template/static/getStatic.php', json).map(
        response => response.json()
    )
}

getListNews(id){
    const json = JSON.stringify({
        'id':id
    })

    return this._http.post(this.uri + 'template/news/getNews.php', json).map(
        response => response.json()
    )
}
    
    test(){
        return this._http.get('http://kumi20.webd.pl/api/cms/dekodowanie.php', {headers: this.headers}).map(
        response => response.json()
        )
    }

}


