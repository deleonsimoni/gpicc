import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaComponent } from './grupos-pesquisa.component';

describe('GruposPesquisaComponent', () => {
  let component: GruposPesquisaComponent;
  let fixture: ComponentFixture<GruposPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
