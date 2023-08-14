import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareThisButtonsComponent } from './share-this-buttons.component';

describe('ShareThisButtonsComponent', () => {
  let component: ShareThisButtonsComponent;
  let fixture: ComponentFixture<ShareThisButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareThisButtonsComponent]
    });
    fixture = TestBed.createComponent(ShareThisButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
