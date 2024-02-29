import { TestBed } from '@angular/core/testing';

import { RespondentserviceService } from './respondentservice.service';

describe('RespondentserviceService', () => {
  let service: RespondentserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespondentserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
