import { TestBed } from '@angular/core/testing';
import { PetTypeEffects } from './pet-type.effects';


describe('PetTypeService', () => {
  let service: PetTypeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetTypeEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
