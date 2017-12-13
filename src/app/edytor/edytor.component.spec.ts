import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdytorComponent } from './edytor.component';

describe('EdytorComponent', () => {
  let component: EdytorComponent;
  let fixture: ComponentFixture<EdytorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdytorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdytorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
