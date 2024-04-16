import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpModuleComponent } from './help-module.component';

describe('HelpModuleComponent', () => {
  let component: HelpModuleComponent;
  let fixture: ComponentFixture<HelpModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
