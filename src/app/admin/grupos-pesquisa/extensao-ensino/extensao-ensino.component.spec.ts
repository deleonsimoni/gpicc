import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensaoEnsinoComponent } from './.component';

describe('ExtensaoEnsinoComponent', () => {
  let component: ExtensaoEnsinoComponent;
  let fixture: ComponentFixture<ExtensaoEnsinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtensaoEnsinoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensaoEnsinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
