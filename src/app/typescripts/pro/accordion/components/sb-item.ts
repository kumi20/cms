import {Component, ContentChild, Input, Inject, forwardRef, AfterViewInit} from '@angular/core';
import {SBItemBodyComponent} from './sb-item.body';
import {SqueezeBoxComponent} from './squeezebox';

@Component({
  exportAs: 'sbItem',
  selector: 'mdb-item',
  templateUrl: 'sb-item.html'
})
export class SBItemComponent {

  private squeezebox: SqueezeBoxComponent;

  @Input() public collapsed = true;
 

  constructor(@Inject(forwardRef(() => SqueezeBoxComponent)) squeezebox: SqueezeBoxComponent) {
    this.squeezebox = squeezebox;
  }

  ngAfterViewInit() {
  
  }
 

  applyToggle(collapsed: boolean) {
    this.collapsed = collapsed;
 
  }
}
