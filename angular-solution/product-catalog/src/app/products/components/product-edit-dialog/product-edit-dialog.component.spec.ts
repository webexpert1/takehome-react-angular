import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ProductEditDialogComponent } from './product-edit-dialog.component';

// Mock data for testing
const mockProduct = {
  id: 1,
  title: 'Sample Product',
  category: 'Electronics',
  price: 100
};

describe('ProductEditDialogComponent', () => {
  let component: ProductEditDialogComponent;
  let fixture: ComponentFixture<ProductEditDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ProductEditDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, ProductEditDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockProduct },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the provided product data', () => {
    expect(component.editForm.value).toEqual(mockProduct);
  });

  it('should validate required fields', () => {
    component.editForm.controls['title'].setValue('');
    expect(component.editForm.controls['title'].valid).toBeFalse();

    component.editForm.controls['title'].setValue('Updated Product');
    expect(component.editForm.controls['title'].valid).toBeTrue();
  });

  it('should close the dialog with updated product data when saved', () => {
    component.editForm.controls['title'].setValue('Updated Product');
    component.editForm.controls['price'].setValue(150);

    component.onSave();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      id: 1,
      title: 'Updated Product',
      category: 'Electronics',
      price: 150
    });
  });

  it('should close the dialog without saving when canceled', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
