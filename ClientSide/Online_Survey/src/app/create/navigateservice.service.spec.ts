import { TestBed } from '@angular/core/testing';

import { NavigateserviceService } from './navigateservice.service';

describe('NavigateserviceService', () => {
  let service: NavigateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
