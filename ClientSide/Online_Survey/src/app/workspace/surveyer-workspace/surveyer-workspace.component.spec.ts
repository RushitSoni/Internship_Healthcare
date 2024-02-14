import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyerWorkspaceComponent } from './surveyer-workspace.component';

describe('SurveyerWorkspaceComponent', () => {
  let component: SurveyerWorkspaceComponent;
  let fixture: ComponentFixture<SurveyerWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SurveyerWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyerWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
