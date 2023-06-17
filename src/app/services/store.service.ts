import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyOrder } from '../models/interfaces/store.model';
import { checkToken } from '../interceptors/token.interceptor';
@Injectable({
  providedIn: 'root'
})

export class StoreService {

  private apiUrl = `${environment.API_URL}`;
  private newShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  private cartAnimationSource = new BehaviorSubject<boolean>(false);
  cartAnimation$ = this.cartAnimationSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  addProduct(product: Product) {
    this.newShoppingCart.push(product);
    this.myCart.next(this.newShoppingCart);
  }

  getMyOrder() {
    return this.http.get<MyOrder[]>(`${this.apiUrl}/profile/my-orders`, { context: checkToken() });
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
