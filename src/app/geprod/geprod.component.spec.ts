import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeprodComponent } from './geprod.component';

describe('GeprodComponent', () => {
  let component: GeprodComponent;
  let fixture: ComponentFixture<GeprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
