import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuemSomosGrupoComponent } from './quem-somos-grupo.component';

describe('QuemSomosComponent', () => {
  let component: QuemSomosGrupoComponent;
  let fixture: ComponentFixture<QuemSomosGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuemSomosGrupoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuemSomosGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
