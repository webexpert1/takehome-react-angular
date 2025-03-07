import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService, Product } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { id: 1, title: 'Product A', category: 'Electronics', price: 100 },
    { id: 2, title: 'Product B', category: 'Clothing', price: 50 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API and update the state', () => {
    service.fetchProducts();

    const req = httpMock.expectOne('https://dummyjson.com/products');
    expect(req.request.method).toBe('GET');

    req.flush({ products: mockProducts });

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });
  });

  it('should update a product in the local state', () => {
    service.fetchProducts();

    const req = httpMock.expectOne('https://dummyjson.com/products');
    req.flush({ products: mockProducts });

    const updatedProduct: Product = { id: 1, title: 'Updated Product A', category: 'Electronics', price: 120 };
    service.updateProduct(updatedProduct);

    service.getProducts().subscribe(products => {
      expect(products.find(p => p.id === 1)?.title).toBe('Updated Product A');
      expect(products.length).toBe(2);
    });
  });
});
