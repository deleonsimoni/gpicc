import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTermoComponent } from './modal-termo.component';

describe('ModalTermoComponent', () => {
  let component: ModalTermoComponent;
  let fixture: ComponentFixture<ModalTermoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTermoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTermoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
