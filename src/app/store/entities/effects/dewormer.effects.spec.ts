import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DewormerEffects } from './dewormer.effects';

describe('DewormerEffects', () => {
  let actions$: Observable<any>;
  let effects: DewormerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DewormerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DewormerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
