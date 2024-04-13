import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { respondentPreventGuard } from './respondent-prevent.guard';

describe('respondentPreventGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => respondentPreventGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
