import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpirStatisticComponent } from './kpir-statistic.component';

describe('KpirStatisticComponent', () => {
  let component: KpirStatisticComponent;
  let fixture: ComponentFixture<KpirStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpirStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpirStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
