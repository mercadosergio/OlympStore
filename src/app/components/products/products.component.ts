import { Component, OnInit } from '@angular/core';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.newShoppingCart = this.storeService.getShoppingCart();
  }

  newShoppingCart: Product[] = [];
  total = 0;

  today = new Date();
  date = new Date(2021, 1, 20);
  showDetail = false;
  products: Product[] = [];

  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };

  limit = 10;
  offset = 0;

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0)
      .subscribe(data => {
        this.products = data;
        this.offset += this.limit;
      });
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
    this.productsService.getProduct(id)
      .subscribe(data => {
        this.toggleDetail();
        this.productChosen = data;
      });

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
    const id = this.productChosen.id;
    this.productsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex, 1);
        this.showDetail = false;
      });
  }


  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
