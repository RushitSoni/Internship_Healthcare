import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSurveyerComponent } from './add-edit-surveyer.component';

describe('AddEditSurveyerComponent', () => {
  let component: AddEditSurveyerComponent;
  let fixture: ComponentFixture<AddEditSurveyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditSurveyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditSurveyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
