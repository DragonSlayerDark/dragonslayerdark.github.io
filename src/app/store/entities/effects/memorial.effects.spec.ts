import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MemorialEffects } from './memorial.effects';

describe('MemorialEffects', () => {
  let actions$: Observable<any>;
  let effects: MemorialEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MemorialEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MemorialEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
