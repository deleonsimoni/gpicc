import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCominduComponent } from './home-comindu.component';

describe('HomeCominduComponent', () => {
  let component: HomeCominduComponent;
  let fixture: ComponentFixture<HomeCominduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCominduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCominduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
