import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadeCominduComponent } from './comunidade-comindu.component';

describe('ComunidadeCominduComponent', () => {
  let component: ComunidadeCominduComponent;
  let fixture: ComponentFixture<ComunidadeCominduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComunidadeCominduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunidadeCominduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
