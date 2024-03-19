import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySurveysComponent } from './my-surveys.component';

describe('MySurveysComponent', () => {
  let component: MySurveysComponent;
  let fixture: ComponentFixture<MySurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MySurveysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
