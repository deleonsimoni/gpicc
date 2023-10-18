import { TestBed } from '@angular/core/testing';

import { GepedService } from './geped.service';

describe('GepedService', () => {
  let service: GepedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GepedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
