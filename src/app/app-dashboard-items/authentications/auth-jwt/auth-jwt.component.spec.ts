import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthJwtComponent } from './auth-jwt.component';

describe('AuthJwtComponent', () => {
  let component: AuthJwtComponent;
  let fixture: ComponentFixture<AuthJwtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthJwtComponent]
    });
    fixture = TestBed.createComponent(AuthJwtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
