import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosGruposComponent } from './projetos-grupos.component';

describe('ProjetosGruposComponent', () => {
  let component: ProjetosGruposComponent;
  let fixture: ComponentFixture<ProjetosGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetosGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetosGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
