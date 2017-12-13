import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StronaComponent } from './strona.component';

describe('StronaComponent', () => {
  let component: StronaComponent;
  let fixture: ComponentFixture<StronaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StronaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StronaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
