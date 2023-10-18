import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGroupParceirosComponent } from './dialog-group-parceiros.component';

describe('DialogGroupParceirosComponent', () => {
  let component: DialogGroupParceirosComponent;
  let fixture: ComponentFixture<DialogGroupParceirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGroupParceirosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGroupParceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
