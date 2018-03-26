import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDetalisComponent } from './menu-detalis.component';

describe('MenuDetalisComponent', () => {
  let component: MenuDetalisComponent;
  let fixture: ComponentFixture<MenuDetalisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDetalisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
