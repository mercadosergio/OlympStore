import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { Customer } from 'src/app/models/interfaces/customer.model';
import { Product } from 'src/app/models/interfaces/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent implements OnInit {
  private storeService = inject(StoreService);
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  orderForm!: FormGroup;
  shoppingCart: Product[] = [];
  myCustomerProfile!: Customer;

  ngOnInit() {
    this.loadShoppingCart();
    this.buildOrderForm();
    this.redirect();
  }

  loadShoppingCart() {
    this.storeService.myCart$.subscribe((products) => {
      this.shoppingCart = products;
    });
  }

  toOrder() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService
        .getProfile()
        .pipe(
          switchMap((user) => {
            if (user.role === 'customer') {
              return this.authService.getCustomerByUserId();
            } else {
              return of(null);
            }
          })
        )
        .subscribe({
          next: (customer) => {
            if (customer) {
              this.myCustomerProfile = customer;
              this.storeService
                .createOrder(this.myCustomerProfile.id)
                .subscribe({
                  next: (order) => {
                    console.log('Creado exitosamente', order);
                    for (let item of this.shoppingCart) {
                      this.storeService
                        .addItem(order.id, item.id, 2)
                        .subscribe({
                          next: (items) => {
                            console.log(items);
                          },
                          error: (error) => {
                            console.log(error);
                          },
                        });
                    }
                  },
                  error: (error) => {
                    console.log(error);
                  },
                });
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  buildOrderForm() {
    this.orderForm = this.fb.nonNullable.group({
      amount: [1, [Validators.required]],
    });
  }

  redirect() {
    if (this.shoppingCart.length <= 0) {
      this.router.navigate(['/home']);
    }
  }
}
