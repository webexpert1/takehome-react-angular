import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

// Mock products
const mockProducts = [
  { id: 1, title: 'Laptop', category: 'Electronics', price: 1000 },
  { id: 2, title: 'Phone', category: 'Electronics', price: 500 },
  { id: 3, title: 'Shoes', category: 'Fashion', price: 50 }
];

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['fetchProducts', 'getProducts']);
    productServiceSpy.getProducts.and.returnValue(of(mockProducts));

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatDialogModule, ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on initialization', () => {
    expect(component.products.length).toBe(3);
    expect(component.filteredProducts.length).toBe(3);
  });

  it('should filter products by search query', () => {
    component.searchControl.setValue('Laptop');
    component.applyFilters();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].title).toBe('Laptop');
  });

  it('should filter products by category', () => {
    component.categoryControl.setValue('Electronics');
    component.applyFilters();
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should filter products by price range', () => {
    component.minPriceControl.setValue('100');
    component.maxPriceControl.setValue('600');
    component.applyFilters();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].title).toBe('Phone');
  });

  it('should open edit dialog and update product', () => {
    const mockUpdatedProduct = { id: 1, title: 'Updated Laptop', category: 'Electronics', price: 1100 };
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(mockUpdatedProduct), close: null });

    dialogSpy.open.and.returnValue(dialogRefSpyObj);
    
    component.editProduct(mockProducts[0]);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(component.products[0].title).toBe('Updated Laptop');
  });

  it('should not update product if edit dialog is closed without changes', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(null), close: null });

    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.editProduct(mockProducts[0]);
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(component.products[0].title).toBe('Laptop');
  });
});
