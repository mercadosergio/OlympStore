import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import {
  CreateProductDTO,
  IFormProduct,
  Product,
} from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProductImage } from 'src/app/models/interfaces/product-image.model';
import { ImageDropService } from 'src/app/services/image-drop.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  controlCategory: FormControl = new FormControl();

  imgPreview!: string;
  files: any = [];

  productForm!: FormGroup<IFormProduct>;

  categories: Category[] = [];
  productId: number | null = null;
  product!: Product;
  categoryIdChecked: number = 0;

  title: string = '';
  actionButton: string = '';

  // Images
  images: ProductImage[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService,
    private productService: ProductsService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private pImageService: ImageDropService
  ) { }

  ngOnInit(): void {
    this.loadForm();
    this.getCategories();
    if (this.isUpdate) {
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
          this.productForm.patchValue(product);
        });

      this.title = 'Editar producto';
      this.actionButton = 'Actualizar';
      // Imagenes quemadas
      this.images = this.pImageService.getImages();

    } else {
      this.title = 'Agregar producto';
      this.actionButton = 'Guardar';
    }
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

  loadEditForm(data: Product) { }

  private loadForm() {
    this.productForm = this.fb.nonNullable.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: [0, [Validators.required]],
      images: [[''], Validators.required],
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      this.productService.create(this.Product)
        .subscribe({
          next: (product) => {
            console.log('Product no: ', product.id);
            this.alertService.showAlert('Producto añadido', 'Listo');
            this.router.navigate(['/admin/products-cms']);
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  action() {
    if (this.isUpdate) {
    } else {
      this.addProduct();
    }
  }

  captureFile(event: any) {
    const file = event.target.files[0];
    this.extractBase64(file).then((img: any) => {
      this.imgPreview = img.base;
      // console.log(img);
    });
    this.files.push(file);
    console.log(this.files);
  }

  get isUpdate(): boolean {
    return this.router.url.includes('edit-product');
  }

  get Product(): CreateProductDTO {
    return {
      title: this.productForm.controls.title.value,
      description: this.productForm.controls.description.value,
      price: this.productForm.controls.price.value,
      images: ['https://placeimg.com/640/480/any?r=0.8178230965721403'],
      categoryId: this.productForm.controls.categoryId.value,
    };
  }

  extractBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const img = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        return null;
      }
      return $event;
    });

  drop(event: CdkDragDrop<ProductImage[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex);

    const position = this.pImageService.getPosition(event.container.data, event.currentIndex);
    const image = event.container.data[event.currentIndex];
    const listId = event.container.id;
    console.log('IMAGE PSITION: ', position);

    // this.updateCard(image, position, listId);
  }
}
