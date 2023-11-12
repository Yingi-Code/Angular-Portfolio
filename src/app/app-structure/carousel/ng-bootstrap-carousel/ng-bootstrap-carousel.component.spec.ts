import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBootstrapCarouselComponent } from './ng-bootstrap-carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NgBootstrapCarouselComponent', () => {
  let component: NgBootstrapCarouselComponent;
  let fixture: ComponentFixture<NgBootstrapCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        BrowserAnimationsModule
      ],
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
