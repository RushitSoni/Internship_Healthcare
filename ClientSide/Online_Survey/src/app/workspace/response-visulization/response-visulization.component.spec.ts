import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseVisulizationComponent } from './response-visulization.component';

describe('ResponseVisulizationComponent', () => {
  let component: ResponseVisulizationComponent;
  let fixture: ComponentFixture<ResponseVisulizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseVisulizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseVisulizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
