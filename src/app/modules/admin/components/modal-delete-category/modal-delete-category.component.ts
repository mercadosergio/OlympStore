import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { ModalDeleteProductComponent } from '../modal-delete-product/modal-delete-product.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/interfaces/category.model';

@Component({
  selector: 'app-modal-delete-category',
  templateUrl: './modal-delete-category.component.html',
  styleUrls: ['./modal-delete-category.component.scss'],
})
export class ModalDeleteCategoryComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoriesService,
    private alertService: AlertService
  ) {}

  confirmDelete() {
    const id = this.data.id;
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.alertService.showAlert('Categoria eliminada con éxito', 'Listo');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onClickNo(): void {
    this.dialogRef.close();
  }
}
