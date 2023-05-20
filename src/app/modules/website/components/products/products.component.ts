import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { concat, switchMap, zip } from 'rxjs';
import { FilesService } from 'src/app/services/files.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService,
    private filesService: FilesService,
  ) {
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
  // @Input() productId: string | null = null;

  productChosen: Product = {
    id: 0,
    price: 0,
    images: [],
    title: '',
    category: {
      id: 0,
      name: '',
    },
    description: ''
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  ngOnInit(): void {
  }

  onAddShoppingCart(product: Product) {
    // this.newShoppingCart.push(product);
    this.storeService.addProduct(product);
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
        // Swal.fire({
        //   title: 'Error!',
        //   text: errorMsg,
        //   icon: 'error',
        //   confirmButtonText: 'Ok',
        // });
        // window.alert(errorMsg);
      }
    });
  }

  readAndUpdate(id: number) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) =>
          this.productsService.update(Number(product.id), { title: 'change' }),
        )
      )
      .subscribe(data => {
        console.log(data);

      });
    this.productsService.fetchReadAndUpdate(id, { title: 'nuevo' })
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
      })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo',
      description: 'asdasdsadas',
      images: [''],
      price: 1000,
      categoryId: 2,
    }
    this.productsService.create(product)
      .subscribe(data => {
        // console.log('created',data);
        this.products.unshift(data);
      });
  }

  // updateProduct() {
  //   const changes: UpdateProductDTO = {
  //     title: 'changge title',
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
    this.productsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex, 1);
        this.showDetail = false;
      });
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  download() {
    this.filesService.getFile('miArchivo', 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', 'application/pdf')
      .subscribe();
  }

  imgRta = '';

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file) {

      this.filesService.uploadFile(file)
        .subscribe(rta => {
          this.imgRta = rta.location;
        });
    }
  }
}
