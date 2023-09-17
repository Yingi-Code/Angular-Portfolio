import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemsComponent } from './dashboard-items.component';

describe('DashboardItemsComponent', () => {
  let component: DashboardItemsComponent;
  let fixture: ComponentFixture<DashboardItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardItemsComponent]
    });
    fixture = TestBed.createComponent(DashboardItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
