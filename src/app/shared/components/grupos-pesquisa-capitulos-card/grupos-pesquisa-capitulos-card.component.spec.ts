import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaCapitulosCardComponent } from './grupos-pesquisa-capitulos-card.component';

describe('GruposPesquisaCapitulosCardComponent', () => {
  let component: GruposPesquisaCapitulosCardComponent;
  let fixture: ComponentFixture<GruposPesquisaCapitulosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaCapitulosCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaCapitulosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
