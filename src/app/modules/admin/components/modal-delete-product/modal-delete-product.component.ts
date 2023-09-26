import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Product } from 'src/app/models/interfaces/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-modal-delete-product',
    templateUrl: './modal-delete-product.component.html',
    styleUrls: ['./modal-delete-product.component.scss'],
    standalone: true,
    imports: [MatDialogModule]
})
export class ModalDeleteProductComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductsService,
    private alertService: AlertService
  ) {}

  deleteProduct() {
    const images = this.data.images;
    for (let img of images) {
      this.productService.deleteFile(img.id).subscribe({
        next: () => {},
        error: (error) => {
          console.log(error);
        },
      });
    }
    const id = this.data.id;
    this.productService.delete(id).subscribe({
      next: () => {
        this.alertService.showAlert('Producto eliminado con éxito', 'Listo');
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
