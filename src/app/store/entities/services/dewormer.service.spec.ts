import { TestBed } from '@angular/core/testing';

import { DewormerService } from './dewormer.service';

describe('DewormerService', () => {
  let service: DewormerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DewormerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
