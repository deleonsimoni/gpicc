import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposExtensaoEnsinoCardComponent } from './grupos-extensao-ensino-card.component';

describe('GruposExtensaoEnsinoCardComponent', () => {
  let component: GruposExtensaoEnsinoCardComponent;
  let fixture: ComponentFixture<GruposExtensaoEnsinoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposExtensaoEnsinoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposExtensaoEnsinoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
