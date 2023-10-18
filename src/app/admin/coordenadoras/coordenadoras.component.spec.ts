import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordenadorasComponent } from './coordenadoras.component';

describe('CoordenadorasComponent', () => {
  let component: CoordenadorasComponent;
  let fixture: ComponentFixture<CoordenadorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordenadorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordenadorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
