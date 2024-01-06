import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CascadingMenuComponent } from './cascading-menu.component';

describe('CascadingMenuComponent', () => {
  let component: CascadingMenuComponent;
  let fixture: ComponentFixture<CascadingMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CascadingMenuComponent]
    });
    fixture = TestBed.createComponent(CascadingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
