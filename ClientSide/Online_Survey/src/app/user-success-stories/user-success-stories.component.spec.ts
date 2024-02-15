import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSuccessStoriesComponent } from './user-success-stories.component';

describe('UserSuccessStoriesComponent', () => {
  let component: UserSuccessStoriesComponent;
  let fixture: ComponentFixture<UserSuccessStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSuccessStoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSuccessStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
