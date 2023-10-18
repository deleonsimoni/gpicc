import { TestBed } from '@angular/core/testing';

import { CominduService } from './comindu.service';

describe('CominduService', () => {
  let service: CominduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CominduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
