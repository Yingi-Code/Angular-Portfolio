import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeveloperComponent } from './ideveloper.component';

describe('IdeveloperComponent', () => {
  let component: IdeveloperComponent;
  let fixture: ComponentFixture<IdeveloperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdeveloperComponent]
    });
    fixture = TestBed.createComponent(IdeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
