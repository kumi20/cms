import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKontrahentaComponent } from './add-kontrahenta.component';

describe('AddKontrahentaComponent', () => {
  let component: AddKontrahentaComponent;
  let fixture: ComponentFixture<AddKontrahentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKontrahentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKontrahentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
