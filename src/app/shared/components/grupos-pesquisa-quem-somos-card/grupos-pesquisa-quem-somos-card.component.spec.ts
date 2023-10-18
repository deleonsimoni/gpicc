import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaQuemSomosCardComponent } from './grupos-pesquisa-quem-somos-card.component';

describe('GruposPesquisaQuemSomosCardComponent', () => {
  let component: GruposPesquisaQuemSomosCardComponent;
  let fixture: ComponentFixture<GruposPesquisaQuemSomosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaQuemSomosCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaQuemSomosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
