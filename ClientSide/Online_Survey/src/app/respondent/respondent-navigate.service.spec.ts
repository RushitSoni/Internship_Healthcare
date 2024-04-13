import { TestBed } from '@angular/core/testing';

import { RespondentNavigateService } from './respondent-navigate.service';

describe('RespondentNavigateService', () => {
  let service: RespondentNavigateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespondentNavigateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
