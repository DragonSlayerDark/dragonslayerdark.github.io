import { TestBed } from '@angular/core/testing';

import { PetBreedService } from './pet-breed.service';

describe('PetBreedService', () => {
  let service: PetBreedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetBreedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
