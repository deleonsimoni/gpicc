import { TestBed, inject } from '@angular/core/testing';
import { CoordenadorasService } from './coordenadoras.service';


describe('CoordenadorasService', () => {
  let service: CoordenadorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordenadorasService],
    });
    service = TestBed.inject(CoordenadorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
