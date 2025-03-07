import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';
  private products$ = new BehaviorSubject<Product[]>([]); // Local state for products

  constructor(private http: HttpClient) { }

  fetchProducts(): void {
    this.http.get<{ products: Product[] }>(this.apiUrl)
      .pipe(map(response => response.products))
      .subscribe(products => this.products$.next(products));
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  updateProduct(updatedProduct: Product): void {
    const currentProducts = this.products$.getValue();
    const updatedProducts = currentProducts.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.products$.next(updatedProducts);
  }

}
