import { TestBed } from '@angular/core/testing';

import { ObserversServiceService } from './observers-service.service';

describe('ObserversServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObserversServiceService = TestBed.get(ObserversServiceService);
    expect(service).toBeTruthy();
  });
});
