import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExtensaoEnsinoGroupComponent } from './dialog-extensao-ensino-group.component';

describe('DialogExtensaoEnsinoGroupComponent', () => {
  let component: DialogExtensaoEnsinoGroupComponent;
  let fixture: ComponentFixture<DialogExtensaoEnsinoGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExtensaoEnsinoGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExtensaoEnsinoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
