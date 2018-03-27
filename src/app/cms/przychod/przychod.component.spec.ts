import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzychodComponent } from './przychod.component';

describe('PrzychodComponent', () => {
  let component: PrzychodComponent;
  let fixture: ComponentFixture<PrzychodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrzychodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzychodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
