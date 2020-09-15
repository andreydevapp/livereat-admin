import { TestBed } from '@angular/core/testing';

import { CantidadesService } from './cantidades.service';

describe('CantidadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CantidadesService = TestBed.get(CantidadesService);
    expect(service).toBeTruthy();
  });
});
