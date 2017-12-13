import {Component, Input,Type, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, OnDestroy, ElementRef, ComponentRef, isDevMode, OnInit} from '@angular/core';

import { EdytorComponent } from '../../edytor/edytor.component';
import { TrescComponent } from '../tresc/tresc.component';
import { StaticComponent } from '../../template/static/static.component';
import { NewsComponentView } from '../../template/news/news.component';

@Component({
  selector: 'app-dynamic-component',
  entryComponents:[
    EdytorComponent,
    StaticComponent,
    NewsComponentView
  ],
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  inputs: ['idTresci','pageElement']
})
export class DynamicComponentComponent implements OnInit {

  @ViewChild('dynamicComponentContainer', {read: ViewContainerRef}) dynamicComponentContainer;
  @Input() componentData; 
  idTresci;
  pageElement;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentData.component);
      const componentRef = this.dynamicComponentContainer.createComponent(factory);
      componentRef.instance.idtresci = this.idTresci;
      componentRef.instance.pageElement = this.pageElement;
      //componentRef.instance.callMeFromParent;
      componentRef.changeDetectorRef.detectChanges();

  }

}
