import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KontenerComponent } from './kontener.component';

describe('KontenerComponent', () => {
  let component: KontenerComponent;
  let fixture: ComponentFixture<KontenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KontenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KontenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
