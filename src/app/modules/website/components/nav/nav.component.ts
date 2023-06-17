import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { faShoppingCart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { Product } from 'src/app/models/product.model';
import { TokenService } from 'src/app/services/token.service';
import { Item, MyOrder } from 'src/app/models/interfaces/store.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('opacityScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ]),
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('translateX', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ])

  ]
})

export class NavComponent implements OnInit {
  isSlideoverVisible = false;
  isProfileDropdown = false;
  faShoppingCart = faShoppingCart;
  faXmark = faXmark;

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

  constructor(
    public storeService: StoreService,
    private authService: AuthService,
    private tokenService: TokenService,
    private categoryService: CategoriesService,
    private router: Router) { }

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
    this.authService.getProfile()
      .subscribe({
        next: () => {
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  loadShoppingCart() {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
      this.shoppingCart = products;
    });
  }

  toggleMobileSidebar() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoryService.getAll()
      .subscribe(data => {
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
    this.storeService.getMyOrder()
      .subscribe({
        next: (cart) => {
          this.myShoppingCarts = cart;
          this.currentlyShoppingCart = cart[0];
          this.items = cart[0].items;
          this.itemsCount = cart[0].items.reduce((total, item) => total + item.OrderProduct.amount, 0);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  toggleSlideOver() {
    this.isSlideoverVisible = !this.isSlideoverVisible;
  }
}
