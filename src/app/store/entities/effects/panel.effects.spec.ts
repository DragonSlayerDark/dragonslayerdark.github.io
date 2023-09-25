import { TestBed } from '@angular/core/testing';

import { PanelEffects } from './panel.effects';

describe('PanelEffects', () => {
  let service: PanelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelEffects);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
