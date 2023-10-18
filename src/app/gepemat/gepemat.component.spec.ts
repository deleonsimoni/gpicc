import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GepematComponent } from './gepemat.component';

describe('GepematComponent', () => {
  let component: GepematComponent;
  let fixture: ComponentFixture<GepematComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GepematComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GepematComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
