import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaLivrosCardComponent } from './grupos-pesquisa-livros-card.component';

describe('GruposPesquisaLivrosCardComponent', () => {
  let component: GruposPesquisaLivrosCardComponent;
  let fixture: ComponentFixture<GruposPesquisaLivrosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaLivrosCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaLivrosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
