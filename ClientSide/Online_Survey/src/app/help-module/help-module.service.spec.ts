import { TestBed } from '@angular/core/testing';

import { HelpModuleService } from './help-module.service';

describe('HelpModuleService', () => {
  let service: HelpModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
