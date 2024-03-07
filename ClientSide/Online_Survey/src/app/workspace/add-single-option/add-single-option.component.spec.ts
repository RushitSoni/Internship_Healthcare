import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSingleOptionComponent } from './add-single-option.component';

describe('AddSingleOptionComponent', () => {
  let component: AddSingleOptionComponent;
  let fixture: ComponentFixture<AddSingleOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSingleOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSingleOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
