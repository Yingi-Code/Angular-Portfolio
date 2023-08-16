import { TestBed } from '@angular/core/testing';

import { AngularFormsDataService } from './angular-forms-data.service';

describe('AngularFormsDataService', () => {
  let service: AngularFormsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularFormsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
