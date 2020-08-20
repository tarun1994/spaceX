import { TestBed } from '@angular/core/testing';

import { HttService } from './htt.service';

describe('HttService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttService = TestBed.get(HttService);
    expect(service).toBeTruthy();
  });
});
