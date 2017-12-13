import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrescComponent } from './tresc.component';

describe('TrescComponent', () => {
  let component: TrescComponent;
  let fixture: ComponentFixture<TrescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
