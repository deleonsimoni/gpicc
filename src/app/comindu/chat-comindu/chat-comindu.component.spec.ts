import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCominduComponent } from './chat-comindu.component';

describe('ChatCominduComponent', () => {
  let component: ChatCominduComponent;
  let fixture: ComponentFixture<ChatCominduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatCominduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCominduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
