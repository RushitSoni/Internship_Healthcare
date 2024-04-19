import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyFilledComponent } from './already-filled.component';

describe('AlreadyFilledComponent', () => {
  let component: AlreadyFilledComponent;
  let fixture: ComponentFixture<AlreadyFilledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlreadyFilledComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlreadyFilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
