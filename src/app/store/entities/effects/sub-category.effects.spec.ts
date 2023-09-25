import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SubCategoryEffects } from './sub-category.effects';

describe('SubCategoryEffects', () => {
  let actions$: Observable<any>;
  let effects: SubCategoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SubCategoryEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SubCategoryEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
