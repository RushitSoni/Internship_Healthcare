import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatedetailComponent } from './templatedetail.component';

describe('TemplatedetailComponent', () => {
  let component: TemplatedetailComponent;
  let fixture: ComponentFixture<TemplatedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplatedetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
