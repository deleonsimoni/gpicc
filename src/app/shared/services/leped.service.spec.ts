import { TestBed } from '@angular/core/testing';

import { LepedService } from './comum.service';

describe('LepedService', () => {
  let service: LepedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LepedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
