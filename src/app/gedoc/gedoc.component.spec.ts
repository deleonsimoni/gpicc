import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GedocComponent } from './gedoc.component';

describe('GedocComponent', () => {
  let component: GedocComponent;
  let fixture: ComponentFixture<GedocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GedocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
