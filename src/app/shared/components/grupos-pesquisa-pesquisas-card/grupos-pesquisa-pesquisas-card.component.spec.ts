import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaPesquisasCardComponent } from './grupos-pesquisa-pesquisas-card.component';

describe('GruposPesquisaPesquisasCardComponent', () => {
  let component: GruposPesquisaPesquisasCardComponent;
  let fixture: ComponentFixture<GruposPesquisaPesquisasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaPesquisasCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaPesquisasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
