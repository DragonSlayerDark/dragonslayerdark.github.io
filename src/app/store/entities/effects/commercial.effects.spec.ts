import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CommercialEffects } from './commercial.effects';

describe('CommercialEffects', () => {
  let actions$: Observable<any>;
  let effects: CommercialEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommercialEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CommercialEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
