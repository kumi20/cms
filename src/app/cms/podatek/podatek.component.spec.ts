import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodatekComponent } from './podatek.component';

describe('PodatekComponent', () => {
  let component: PodatekComponent;
  let fixture: ComponentFixture<PodatekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodatekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodatekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
