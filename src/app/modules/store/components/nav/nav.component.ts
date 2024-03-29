import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Category } from 'src/app/models/interfaces/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { Product } from 'src/app/models/interfaces/product.model';
import { TokenService } from 'src/app/services/token.service';
import { Item, MyOrder } from 'src/app/models/interfaces/store.model';
import { SlideCartComponent } from '../slide-cart/slide-cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' })),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    RouterLinkActive,
    FontAwesomeModule,
    SlideCartComponent,
    AsyncPipe,
  ],
})
export class NavComponent implements OnInit {
  public storeService = inject(StoreService);
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private categoryService = inject(CategoriesService);
  private router = inject(Router);

  isSlideoverVisible: boolean = false;
  isProfileDropdown: boolean = false;
  faShoppingCart = faShoppingCart;

  activeMenu = false;
  counter = 0;
  categories!: Category[];

  navbarfixed: boolean = false;

  user$ = this.authService.user$;
  shoppingCart: Product[] = [];

  myShoppingCarts!: MyOrder[];
  currentlyShoppingCart!: MyOrder;
  items: Item[] = [];
  itemsCount: number = 0;

  cartState: boolean = false;

  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 100) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false;
    }
  }

  ngOnInit(): void {
    this.loadShoppingCart();
    this.getAllCategories();
    this.storeService.cartAnimation$.subscribe((shouldAnimate) => {
      if (shouldAnimate) {
        this.cartState = true;

        setTimeout(() => {
          this.cartState = false;
        }, 500);
      }
    });
    const token = this.tokenService.getToken();
    if (token) {
      this.getProfile();
      this.getMyShoppingCarts();
    }
  }

  getProfile() {
    this.authService.getProfile().subscribe({
      next: () => {},
      error: (error) => {
        console.log(error);
      },
    });
  }

  loadShoppingCart() {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
      this.shoppingCart = products;
    });
  }

  toggleMobileSidebar() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  login() {
    if (!this.user$) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home'], { skipLocationChange: true });
  }

  toggleMenu() {
    this.isProfileDropdown = !this.isProfileDropdown;
  }

  getMyShoppingCarts() {
    this.storeService.getMyOrder().subscribe({
      next: (cart) => {
        this.myShoppingCarts = cart;
        this.currentlyShoppingCart = cart[0];
        // this.itemsCount = cart[0].items.reduce((total, item) => total + item.OrderProduct.amount, 0);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  toggleSlideOver() {
    this.isSlideoverVisible = !this.isSlideoverVisible;
  }
}
