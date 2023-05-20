import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.scss']
})
export class ModalDeleteProductComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalDeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductsService,
    private alertService: AlertService,
  ) { }

  deleteProduct() {
    const id = this.data.id;
    this.productService.delete(id)
      .subscribe({
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
