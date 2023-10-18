import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesesComponent } from './teses.component';

describe('TesesComponent', () => {
  let component: TesesComponent;
  let fixture: ComponentFixture<TesesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
