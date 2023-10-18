import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GepedComponent } from './geped.component';

describe('GepedComponent', () => {
  let component: GepedComponent;
  let fixture: ComponentFixture<GepedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GepedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GepedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
