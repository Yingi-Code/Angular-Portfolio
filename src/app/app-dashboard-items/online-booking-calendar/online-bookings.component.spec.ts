import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineBookingsComponent } from './online-bookings.component';

describe('OnlineBookingsComponent', () => {
  let component: OnlineBookingsComponent;
  let fixture: ComponentFixture<OnlineBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineBookingsComponent]
    });
    fixture = TestBed.createComponent(OnlineBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
