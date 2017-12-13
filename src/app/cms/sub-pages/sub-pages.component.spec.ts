import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPagesComponent } from './sub-pages.component';

describe('SubPagesComponent', () => {
  let component: SubPagesComponent;
  let fixture: ComponentFixture<SubPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
