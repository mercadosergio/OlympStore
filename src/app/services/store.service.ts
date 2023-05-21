import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private newShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  private cartAnimationSource = new BehaviorSubject<boolean>(false);
  cartAnimation$ = this.cartAnimationSource.asObservable();

  constructor() { }

  addProduct(product: Product) {
    this.newShoppingCart.push(product);
    this.myCart.next(this.newShoppingCart);
  }

  getTotal() {
    return this.newShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

  getShoppingCart() {
    return this.newShoppingCart;
  }

  animateCart() {
    this.cartAnimationSource.next(true);
  }
}
