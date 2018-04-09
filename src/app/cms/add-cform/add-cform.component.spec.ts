import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCformComponent } from './add-cform.component';

describe('AddCformComponent', () => {
  let component: AddCformComponent;
  let fixture: ComponentFixture<AddCformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
