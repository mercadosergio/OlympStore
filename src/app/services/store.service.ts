import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private newShoppingCart: Product[] = [];

  constructor() { }

  addProduct(product: Product) {
    this.newShoppingCart.push(product);
  }

  getTotal() {
    return this.newShoppingCart.reduce((sum, item) => sum + item.price, 0)

  }

  getShoppingCart(){
    return this.newShoppingCart;
  }
}
