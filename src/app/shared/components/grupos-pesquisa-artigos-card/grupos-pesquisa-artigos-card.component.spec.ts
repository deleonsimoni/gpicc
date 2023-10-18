import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaArtigosCardComponent } from './grupos-pesquisa-artigos-card.component';

describe('GruposPesquisaArtigosCardComponent', () => {
  let component: GruposPesquisaArtigosCardComponent;
  let fixture: ComponentFixture<GruposPesquisaArtigosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaArtigosCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaArtigosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
