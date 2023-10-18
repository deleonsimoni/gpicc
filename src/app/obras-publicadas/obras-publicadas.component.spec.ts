import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasPublicadasComponent } from './obras-publicadas.component';

describe('ObrasPublicadasComponent', () => {
  let component: ObrasPublicadasComponent;
  let fixture: ComponentFixture<ObrasPublicadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObrasPublicadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasPublicadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
