import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritosDataComponent } from './inscritos-data.component';

describe('InscritosDataComponent', () => {
  let component: InscritosDataComponent;
  let fixture: ComponentFixture<InscritosDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscritosDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritosDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
