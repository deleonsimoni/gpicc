import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosInstitucionaisComponent } from './projetos-institucionais.component';

describe('ProjetosInstitucionaisComponent', () => {
  let component: ProjetosInstitucionaisComponent;
  let fixture: ComponentFixture<ProjetosInstitucionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetosInstitucionaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetosInstitucionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
