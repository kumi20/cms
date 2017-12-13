import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrakStronyComponent } from './brak-strony.component';



describe('BrakStronyComponent', () => {
  let component: BrakStronyComponent;
  let fixture: ComponentFixture<BrakStronyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrakStronyComponent ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrakStronyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
