import { Component, ViewChild, Input, ElementRef, Renderer, AfterViewInit, HostListener } from '@angular/core';
import { slideIn, fadeIn } from '../animations/animations.component';

@Component ({
  selector: 'mdb-sidenav',
  templateUrl: 'sidenav.component.html'
})

export class SidenavComponent implements AfterViewInit {
  public windwosWidth: number;
  public shown: boolean;
  private clientX: number;
  showSideNav: Function;

  @Input() public class: string;
  @Input() public fixed = true;

  @ViewChild('sidenav') public sideNav: ElementRef;
  @ViewChild('overlay') public overlay: any;

  constructor( public el: ElementRef,
    public renderer: Renderer) {
          this.showSideNav = renderer.listenGlobal('document', 'mousemove', (event: MouseEvent) => {
              this.clientX = event.pageX;
                  if (this.clientX < 5 ){
                      this.renderer.setElementStyle(this.sideNav.nativeElement, "transform",  "translateX(0%)");
                      this.showOverlay();
                  }  
          });
  }

  ngOnInit() {
      this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
      this.setShown(false);
  }
  ngAfterViewInit() {
    // pobraneie szerokosci okna po init
    this.windwosWidth = window.innerWidth;

    if (this.fixed) {
      this.renderer.setElementClass(document.body, 'fixed-sn', true);

      if (this.windwosWidth < 1441) {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
        this.setShown(false);
      } else {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(0%)');
        this.setShown(false);
      }
    } else {
      this.renderer.setElementClass(document.body, 'hidden-sn', true);
      this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
      this.setShown(false);
    }
  }

  @HostListener('window:resize')
  windwosResize() {
    this.windwosWidth = window.innerWidth;
    if (this.fixed) {
      if (this.windwosWidth < 1441 && this.shown) {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
        this.setShown(false);
      } else {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
        this.setShown(false);
      }

      if (this.windwosWidth > 1440 && this.shown) {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
        this.hideOverlay();
        this.setShown(false);
      }
    } else {
      if (this.windwosWidth > 1440) {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
        this.hideOverlay();
        this.setShown(false);
      }
    }

  };

  show() {
    if (this.fixed) {
      if (this.windwosWidth < 1441) {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(0%)');
        this.setShown(false);
        this.showOverlay();
      } else {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(0%)');
        this.setShown(false);
      }
    } else {
      this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(0%)');
      this.setShown(false);
      this.showOverlay();
    }

  }

  hide() {
    if (this.fixed) {
      if (this.windwosWidth < 1441) {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
        this.setShown(false);
        this.hideOverlay();
      } else {
        this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(0%)');
        this.setShown(false);
      }
    } else {
      this.renderer.setElementStyle(this.sideNav.nativeElement, 'transform',  'translateX(-100%)');
      this.setShown(false);
      this.hideOverlay();
    }
  }

  toggle() {
    if (this.shown) {
      this.hide();
    }  else {
      this.show();
    }
  }

  showOverlay() {
    this.renderer.setElementStyle(this.overlay.nativeElement, 'display', 'block');
    setTimeout(() => {
      this.renderer.setElementStyle(this.overlay.nativeElement, 'opacity', '0');
    }, 0);
  }

  hideOverlay() {
    this.renderer.setElementStyle(this.overlay.nativeElement, 'opacity', '0');
    setTimeout(() => {
      this.renderer.setElementStyle(this.overlay.nativeElement, 'display', 'none');
    }, 200);
  }

  setShown(value: boolean) {
    setTimeout(() => {
      this.shown = value;
    }, 510);
  }

}
