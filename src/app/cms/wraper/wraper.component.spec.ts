import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WraperComponent } from './wraper.component';

describe('WraperComponent', () => {
  let component: WraperComponent;
  let fixture: ComponentFixture<WraperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WraperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
