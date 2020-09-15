import { TestBed } from '@angular/core/testing';

import { PlacesCrService } from './places-cr.service';

describe('PlacesCrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlacesCrService = TestBed.get(PlacesCrService);
    expect(service).toBeTruthy();
  });
});
