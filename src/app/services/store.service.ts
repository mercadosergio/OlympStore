import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/interfaces/product.model';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyOrder } from '../models/interfaces/store.model';
import { checkToken } from '../interceptors/token.interceptor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  private newShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  private cartAnimationSource = new BehaviorSubject<boolean>(false);
  cartAnimation$ = this.cartAnimationSource.asObservable();

  constructor(private http: HttpClient) {}

  createOrder(customerId: number) {
    const orderData = { customerId: customerId };
    return this.http.post<MyOrder>(`${this.apiUrl}/orders`, orderData, {
      context: checkToken(),
    });
  }

  addItem(orderId: number, productId: number, amount: number) {
    return this.http.post(
      `${this.apiUrl}/orders/add-item`,
      { orderId, productId, amount },
      { context: checkToken() }
    );
  }

  addProduct(product: Product) {
    this.newShoppingCart.push(product);
    this.myCart.next(this.newShoppingCart);
  }

  getMyOrder() {
    return this.http.get<MyOrder[]>(`${this.apiUrl}/profile/my-orders`, {
      context: checkToken(),
    });
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
