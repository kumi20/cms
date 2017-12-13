import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperPagesComponent } from './wrapper-pages.component';

describe('WrapperPagesComponent', () => {
  let component: WrapperPagesComponent;
  let fixture: ComponentFixture<WrapperPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
