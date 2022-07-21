import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  categories!: Category[];
  profile: User | null = null;
  token = '';

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoryService.getAll()
      .subscribe(data => {
        this.categories = data;
      });
  }

  login() {
    this.authService.loginAndGet('sergio@mail.com', '1234')
      .subscribe(user => {
        this.profile = user;
        this.token = '---';
      });

    // this.authService.login('sergio@mail.com', '1234')
    //   .subscribe(rta => {
    //     console.log(rta.access_token);
    //     this.token = rta.access_token;
    //   });
  }

  getProfile() {
    this.authService.getProfile(this.token)
      .subscribe(profile => {
        console.log(profile);
      });
  }

}
