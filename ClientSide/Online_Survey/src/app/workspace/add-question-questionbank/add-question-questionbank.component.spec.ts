import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionQuestionbankComponent } from './add-question-questionbank.component';

describe('AddQuestionQuestionbankComponent', () => {
  let component: AddQuestionQuestionbankComponent;
  let fixture: ComponentFixture<AddQuestionQuestionbankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuestionQuestionbankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuestionQuestionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
