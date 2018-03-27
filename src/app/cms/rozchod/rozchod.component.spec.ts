import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RozchodComponent } from './rozchod.component';

describe('RozchodComponent', () => {
  let component: RozchodComponent;
  let fixture: ComponentFixture<RozchodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RozchodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RozchodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
