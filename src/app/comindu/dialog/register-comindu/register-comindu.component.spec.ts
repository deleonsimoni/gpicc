import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCominduComponent } from './register-comindu.component';

describe('RegisterCominduComponent', () => {
  let component: RegisterCominduComponent;
  let fixture: ComponentFixture<RegisterCominduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCominduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCominduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
