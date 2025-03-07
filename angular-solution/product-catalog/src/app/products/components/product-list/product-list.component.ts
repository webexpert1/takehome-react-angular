import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductService } from '../../services/product.service';
import { ProductEditDialogComponent } from '../product-edit-dialog/product-edit-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  minPriceControl = new FormControl('');
  maxPriceControl = new FormControl('');

  categories: string[] = []; 
  loading = true;


  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.productService.fetchProducts();
    this.loadProducts();

    // Listen for changes in filters
    this.searchControl.valueChanges.subscribe(() => this.applyFilters());
    this.categoryControl.valueChanges.subscribe(() => this.applyFilters());
    this.minPriceControl.valueChanges.subscribe(() => this.applyFilters());
    this.maxPriceControl.valueChanges.subscribe(() => this.applyFilters());
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = this.filteredProducts = data; // Copy the data
      this.categories = [...new Set(data.map(p => p.category))]; // Extract unique categories
      this.loading = false;
    }, 
    () => { this.loading = false; });
  }

  applyFilters() {
    let query = this.searchControl.value?.toLowerCase() || '';
    let selectedCategory = this.categoryControl.value;
    let minPrice = this.minPriceControl.value ? parseFloat(this.minPriceControl.value) : null;
    let maxPrice = this.maxPriceControl.value ? parseFloat(this.maxPriceControl.value) : null;

    this.filteredProducts = this.products.filter(p => {
      const matchesQuery = p.title?.toLowerCase().includes(query) ?? false;

      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesPrice =
        (minPrice === null || p.price >= minPrice) &&
        (maxPrice === null || p.price <= maxPrice);

      return matchesQuery && matchesCategory && matchesPrice;
    });
  }

  editProduct(product: any) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: '400px',
      data: { ...product  }
    });

    dialogRef.afterClosed().subscribe(updatedProduct => {
      if (updatedProduct) {
  
        this.products = this.products.map(p =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        );
  
        this.filteredProducts = this.filteredProducts.map(p =>
          p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p
        );
  
        this.applyFilters(); 
      }
    });

  }
}
