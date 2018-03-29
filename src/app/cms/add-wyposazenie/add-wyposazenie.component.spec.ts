import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWyposazenieComponent } from './add-wyposazenie.component';

describe('AddWyposazenieComponent', () => {
  let component: AddWyposazenieComponent;
  let fixture: ComponentFixture<AddWyposazenieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWyposazenieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWyposazenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
