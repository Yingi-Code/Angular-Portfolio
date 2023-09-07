import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLightboxComponent } from './ngx-lightbox.component';

describe('NgxLightboxComponent', () => {
  let component: NgxLightboxComponent;
  let fixture: ComponentFixture<NgxLightboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxLightboxComponent]
    });
    fixture = TestBed.createComponent(NgxLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
