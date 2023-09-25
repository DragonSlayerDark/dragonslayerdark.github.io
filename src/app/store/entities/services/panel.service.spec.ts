import { TestBed } from '@angular/core/testing';

import { PanelService } from './panel.service';

describe('PanelEffects', () => {
  let service: PanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
