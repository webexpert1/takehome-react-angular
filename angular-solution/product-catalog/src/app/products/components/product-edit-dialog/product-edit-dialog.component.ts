import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-edit-dialog',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
    // Initialize form with existing product data
    this.editForm = this.fb.group({
      id: [product.id, [Validators.required]],
      title: [product.title, [Validators.required]],
      category: [product.category, [Validators.required]],
      price: [product.price, [Validators.required, Validators.min(0)]]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
