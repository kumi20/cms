import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalendarzComponent } from './kalendarz.component';

describe('KalendarzComponent', () => {
  let component: KalendarzComponent;
  let fixture: ComponentFixture<KalendarzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalendarzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalendarzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
