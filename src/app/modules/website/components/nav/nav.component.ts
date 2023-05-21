import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('AnimationTrigger0', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(.95)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('75ms ease-in', style({ opacity: 0, transform: 'scale(.95)' }))
      ])
    ])
  ]
})

export class NavComponent implements OnInit {

  isProfileDropdown = false;
  faShoppingCart = faShoppingCart;

  activeMenu = false;
  counter = 0;
  categories!: Category[];
  profile: User | null = null;

  navbarfixed: boolean = false;
  user$ = this.authService.user$;
  shoppingCart: Product[] = [];
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
    private categoryService: CategoriesService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadShoppingCart();
    this.getAllCategories();
    this.authService.user$
      .subscribe(data => {
        this.profile = data;
      });
    this.isProfileDropdown = false;
    this.storeService.cartAnimation$.subscribe((shouldAnimate) => {
      if (shouldAnimate) {
        this.cartState = true;
        console.log(this.cartState);


        setTimeout(() => {
          this.cartState = false;
          console.log(this.cartState);
        }, 500);
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
    if (!this.profile) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

  toggleMenu() {
    this.isProfileDropdown = !this.isProfileDropdown;
  }
}
