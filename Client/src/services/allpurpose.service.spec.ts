import { TestBed } from '@angular/core/testing';

import { AllpurposeService } from './allpurpose.service';

describe('AllpurposeService', () => {
  let service: AllpurposeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllpurposeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
