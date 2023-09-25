import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PetBreedEffects } from './pet-breed.effects';

describe('PetBreedEffects', () => {
  let actions$: Observable<any>;
  let effects: PetBreedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetBreedEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PetBreedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
