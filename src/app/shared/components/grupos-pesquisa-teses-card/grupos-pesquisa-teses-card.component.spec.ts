import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPesquisaTesesCardComponent } from './grupos-pesquisa-teses-card.component';

describe('GruposPesquisaTesesCardComponent', () => {
  let component: GruposPesquisaTesesCardComponent;
  let fixture: ComponentFixture<GruposPesquisaTesesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposPesquisaTesesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPesquisaTesesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
