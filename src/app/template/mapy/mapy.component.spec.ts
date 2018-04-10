import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapyComponent } from './mapy.component';

describe('MapyComponent', () => {
  let component: MapyComponent;
  let fixture: ComponentFixture<MapyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
