import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GecultComponent } from './gecult.component';

describe('GecultComponent', () => {
  let component: GecultComponent;
  let fixture: ComponentFixture<GecultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GecultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GecultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
