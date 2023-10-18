import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuCominduComponent } from './meu-comindu.component';

describe('MeuCominduComponent', () => {
  let component: MeuCominduComponent;
  let fixture: ComponentFixture<MeuCominduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeuCominduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuCominduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
