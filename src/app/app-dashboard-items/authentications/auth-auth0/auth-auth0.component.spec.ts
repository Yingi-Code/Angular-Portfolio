import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAuth0Component } from './auth-auth0.component';

describe('AuthAuth0Component', () => {
  let component: AuthAuth0Component;
  let fixture: ComponentFixture<AuthAuth0Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthAuth0Component]
    });
    fixture = TestBed.createComponent(AuthAuth0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
