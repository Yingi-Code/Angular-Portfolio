import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapCarouselComponent } from './ng-bootstrap-carousel.component';

describe('NgBootstrapCarouselComponent', () => {
  let component: NgBootstrapCarouselComponent;
  let fixture: ComponentFixture<NgBootstrapCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgBootstrapCarouselComponent]
    });
    fixture = TestBed.createComponent(NgBootstrapCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
