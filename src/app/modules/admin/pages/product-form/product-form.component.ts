import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/interfaces/category.model';
import { CreateProductDTO, IFormProduct, Product } from 'src/app/models/interfaces/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductImage } from 'src/app/models/interfaces/product-image.model';
import { ImageDropService } from 'src/app/services/image-drop.service';
import { environment } from 'src/environments/environment';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {

  faTrashCan = faTrashCan;

  productForm!: FormGroup<IFormProduct>;

  categories: Category[] = [];
  productId: number = 0;
  product!: Product;
  categoryIdChecked: number = 0;

  title: string = '';
  actionButton: string = '';

  images: ProductImage[] = [];

  selectedFiles: File[] = [];
  isImages: ProductImage[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private imageDropService: ImageDropService
  ) { }

  ngOnInit(): void {
    this.loadRegisterForm();
    this.getCategories();
    if (this.isUpdate) {
      this.getProductToUpdate();
      this.title = 'Editar producto';
      this.actionButton = 'Actualizar';
    } else {
      this.title = 'Agregar nuevo producto';
      this.actionButton = 'Guardar';
    }
  }

  getProductToUpdate() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          this.productId = +id;
          return this.productService.getProduct(id);
        })
      )
      .subscribe((product) => {
        this.product = product;
        this.categoryIdChecked = product.category.id;
        this.images = product.images;
        this.productForm.patchValue(product);
      });
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private loadRegisterForm() {
    this.productForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: [0, [Validators.required]],
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productService.create(this.currentProduct)
        .subscribe({
          next: (product) => {

            if (this.selectedFiles.length <= 0) {
              //TODO: MAndar mensaje
              //return
            }
            const files = this.selectedFiles;
            let counter = 0;

            for (let file of files) {

              // const position = counter += 1000;
              let position = counter += 65535;
              console.log(position);
              this.productService.addImageToProduct(position, product.id, file)
                .subscribe({
                  next: () => {
                  },
                  error: (error) => {
                    console.log(error);
                  },
                });
            }
            this.alertService.showAlert('Producto añadido', 'Listo');
            this.router.navigate(['/admin/products']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  editProduct() {
    if (this.productForm.valid) {
      this.productService.update(this.productId, this.currentProduct)
        .subscribe({
          next: () => {
            this.alertService.showAlert('Producto actualizado', 'Listo');
          },
          error: (error) => {
            console.log(error);
          },
        })
    }
  }

  action() {
    if (this.isUpdate) {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }

  files: File[] = [];
  filesSelected: (string | ArrayBuffer | null)[] = [];

  captureFiles(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files: File[] = Array.from(event.target.files);
      this.files = files;
      this.selectedFiles = event.target.files;

      this.filesSelected = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filesSelected[i] = reader.result;
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  get isUpdate(): boolean {
    return this.router.url.includes('edit-product');
  }

  get currentProduct(): CreateProductDTO {
    return {
      name: this.productForm.controls.name.value,
      description: this.productForm.controls.description.value,
      price: this.productForm.controls.price.value,
      categoryId: this.productForm.controls.categoryId.value,
    };
  }

  private updateImage(id: ProductImage, position: number) {
    this.productService.updateImageOrder(id.id, position)
      .subscribe((imgUpdate) => {
        console.log(imgUpdate);
      });
  }

  drop(event: CdkDragDrop<ProductImage[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex);

    const position = this.imageDropService.getPosition(event.container.data, event.currentIndex);
    const image = event.container.data[event.currentIndex];
    this.updateImage(image, position);
  }

  deleteImage(id: number, path: string) {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      this.alertService.showAlert('Este archivo no se puede borrar', 'Listo');
    } else {
      this.productService.deleteFile(id)
        .subscribe({
          next: () => {
            this.alertService.showAlert('Archivo borrado', 'Listo');
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
