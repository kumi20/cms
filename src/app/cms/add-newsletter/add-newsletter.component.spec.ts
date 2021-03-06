import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsletterComponent } from './add-newsletter.component';

describe('AddNewsletterComponent', () => {
  let component: AddNewsletterComponent;
  let fixture: ComponentFixture<AddNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
