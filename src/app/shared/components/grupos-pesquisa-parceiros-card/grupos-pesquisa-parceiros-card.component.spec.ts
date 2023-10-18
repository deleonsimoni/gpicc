import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaParceirosCardComponent } from './grupos-pesquisa-parceiros-card.component';

describe('GruposPesquisaParceirosCardComponent', () => {
  let component: GruposPesquisaParceirosCardComponent;
  let fixture: ComponentFixture<GruposPesquisaParceirosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaParceirosCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaParceirosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
