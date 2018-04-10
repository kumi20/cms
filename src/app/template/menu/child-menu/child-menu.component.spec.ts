import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildMenuComponent } from './child-menu.component';

describe('ChildMenuComponent', () => {
  let component: ChildMenuComponent;
  let fixture: ComponentFixture<ChildMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
