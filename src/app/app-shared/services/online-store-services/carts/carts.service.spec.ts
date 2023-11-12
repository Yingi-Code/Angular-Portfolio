import { TestBed } from '@angular/core/testing';

import { CartsService } from './carts.service';
import { HttpClientModule } from '@angular/common/http';

describe('CartsService', () => {
  let service: CartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(CartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
