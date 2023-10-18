import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasPesquisaComponent } from './linhas-pesquisa.component';

describe('LinhasPesquisaComponent', () => {
  let component: LinhasPesquisaComponent;
  let fixture: ComponentFixture<LinhasPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinhasPesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
