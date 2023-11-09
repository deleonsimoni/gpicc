import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducoesComponent } from './producoes.component';

describe('ProducoesComponent', () => {
  let component: ProducoesComponent;
  let fixture: ComponentFixture<ProducoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
