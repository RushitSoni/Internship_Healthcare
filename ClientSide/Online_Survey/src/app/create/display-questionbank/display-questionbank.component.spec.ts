import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayQuestionbankComponent } from './display-questionbank.component';

describe('DisplayQuestionbankComponent', () => {
  let component: DisplayQuestionbankComponent;
  let fixture: ComponentFixture<DisplayQuestionbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayQuestionbankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayQuestionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
