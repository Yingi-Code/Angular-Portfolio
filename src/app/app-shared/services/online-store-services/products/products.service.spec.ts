import { TestBed } from '@angular/core/testing';

import { ProductService } from './products.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
