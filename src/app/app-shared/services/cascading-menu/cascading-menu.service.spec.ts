import { TestBed } from '@angular/core/testing';

import { CascadingMenuService } from './cascading-menu.service';

describe('CascadingMenuService', () => {
  let service: CascadingMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CascadingMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
