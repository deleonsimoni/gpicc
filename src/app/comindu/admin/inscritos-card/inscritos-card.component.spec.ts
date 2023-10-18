import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritosCardComponent } from './inscritos-card.component';

describe('InscritosCardComponent', () => {
  let component: InscritosCardComponent;
  let fixture: ComponentFixture<InscritosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscritosCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
