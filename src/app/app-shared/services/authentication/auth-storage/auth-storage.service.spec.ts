import { TestBed } from '@angular/core/testing';

import { AuthStorageService } from './auth-storage.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthStorageService', () => {
  let service: AuthStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(AuthStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
