import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyerListComponent } from './surveyer-list.component';

describe('SurveyerListComponent', () => {
  let component: SurveyerListComponent;
  let fixture: ComponentFixture<SurveyerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
