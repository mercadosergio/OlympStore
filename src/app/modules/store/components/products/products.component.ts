import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  CreateProductDTO,
  Product,
} from 'src/app/models/interfaces/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { combineLatest, forkJoin, of, switchMap } from 'rxjs';
import { FilesService } from 'src/app/services/files.service';
import { AlertService } from 'src/app/services/alert.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/interfaces/user.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/interfaces/customer.model';
import { FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { NgFor, NgClass, NgIf, CurrencyPipe } from '@angular/common';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [NgFor, ProductComponent, NgClass, NgIf, RouterLink, CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private filesService = inject(FilesService);
  private alertService = inject(AlertService);
  private authService = inject(AuthService);
  private storeService = inject(StoreService);

  showArticles = false;

  constructor() {
    this.newShoppingCart = this.storeService.getShoppingCart();
  }

  newShoppingCart: Product[] = [];
  total = 0;

  today = new Date();
  date = new Date(2021, 1, 20);
  showDetail = false;
  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter();

  @Input() set productId(id: string | null) {
    if (id) {
      this.onShowDetail(id);
    }
  }

  productChosen: Product = {
    id: 0,
    price: 0,
    images: [],
    name: '',
    category: {
      id: 0,
      name: '',
      image: '',
      slug: '',
    },
    description: '',
    slug: '',
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  myProfile!: User;
  myCustomerProfile!: Customer;
  userId!: number;
  customer$ = this.authService.customer$;

  ngOnInit(): void {
    setTimeout(() => {
      this.showArticles = true;
    }, 1000);
  }

  onAddShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.storeService.animateCart();
    this.alertService.showAlert('Agredado al carrito', 'Ok');
    this.total = this.storeService.getTotal();
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if (!this.showDetail) {
      this.showDetail = true;
    }
    this.productsService.getProduct(Number(id)).subscribe({
      next: (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      error: (errorMsg) => {
        this.statusDetail = 'error';
      },
    });
  }

  readAndUpdate(id: number) {
    this.productsService
      .getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.update(Number(product.id), { name: 'change' })
        )
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.productsService
      .fetchReadAndUpdate(id, { name: 'nuevo' })
      .subscribe((response) => {
        const read = response[0];
        const update = response[1];
      });
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      name: 'Nuevo',
      description: 'asdasdsadas',
      price: 1000,
      categoryId: 2,
    };
    this.productsService.create(product).subscribe((data) => {
      // console.log('created',data);
      this.products.unshift(data);
    });
  }

  // updateProduct() {
  //   const changes: UpdateProductDTO = {
  //     name: 'changge name',
  //   }
  //   const id = this.productChosen.id;
  //   this.productsService.update(id, changes)
  //     .subscribe(data => {
  //       const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
  //       this.products[productIndex] = data;
  //       this.productChosen = data;
  //       console.log();

  //     });
  // }

  deleteProduct() {
    const id = Number(this.productChosen.id);
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(
        (item) => item.id === this.productChosen.id
      );
      this.products.splice(productIndex, 1);
      this.showDetail = false;
    });
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  download() {
    this.filesService
      .getFile(
        'miArchivo',
        'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  imgRta = '';

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    console.log(files);

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        console.log(file);
        this.filesService.addImageToProduct(40000, 1, files[i]).subscribe({
          next: (image) => {
            console.log(image);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    }
  }

  // onUpload(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   const file = element.files?.item(0);
  //   console.log(file);

  //   if (file) {

  //     this.filesService.uploadFile(file)
  //       .subscribe(rta => {
  //         this.imgRta = rta.location;
  //       });
  //   }
  // }
}
