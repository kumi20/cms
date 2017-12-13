import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajTrescComponent } from './dodaj-tresc.component';

describe('DodajTrescComponent', () => {
  let component: DodajTrescComponent;
  let fixture: ComponentFixture<DodajTrescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajTrescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajTrescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
