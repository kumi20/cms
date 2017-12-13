import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajNewsaComponent } from './dodaj-newsa.component';

describe('DodajNewsaComponent', () => {
  let component: DodajNewsaComponent;
  let fixture: ComponentFixture<DodajNewsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajNewsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajNewsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
