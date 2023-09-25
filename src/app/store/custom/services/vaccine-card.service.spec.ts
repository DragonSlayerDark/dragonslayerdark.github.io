import { TestBed } from '@angular/core/testing';

import { VaccineCardService } from './vaccine-card.service';

describe('VaccineCardService', () => {
  let service: VaccineCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
