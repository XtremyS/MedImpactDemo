import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPurchasingDetailsComponent } from './user-purchasing-details.component';

describe('UserPurchasingDetailsComponent', () => {
  let component: UserPurchasingDetailsComponent;
  let fixture: ComponentFixture<UserPurchasingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPurchasingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPurchasingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
