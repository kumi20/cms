import { Injectable } from '@angular/core';

import { ToastService } from './typescripts/pro'
import { MDBSpinningPreloader } from './typescripts/pro';

@Injectable()
export class EventService {

  constructor(private toastrService: ToastService,
              private mdbSpinningPreloader: MDBSpinningPreloader
            ) { }


  wyswietlInfo(typ, tresc){
    switch(typ){
        case 'info': this.toastrService.info(tresc); break;
        case 'success': this.toastrService.success(tresc); break;
        case 'error': this.toastrService.error(tresc); break;
    }
  }

  klepsydraStart(){
      document.getElementById('klepsydra').style.display = 'block';
  }

  klepsydraStop(){
      document.getElementById('klepsydra').style.display = 'none';
  }

}
