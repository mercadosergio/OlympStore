import { Component, OnInit } from '@angular/core';
import { faShopify } from '@fortawesome/free-brands-svg-icons';
import {
  faBookmark,
  faBoxOpen,
  faTags,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  faTags = faTags;
  faUsers = faUsers;
  faBoxOpen = faBoxOpen;
  faShopify = faShopify;
  faBookMark = faBookmark;

  usersCount: number = 0;
  productsCount: number = 0;
  categoriesCount: number = 0;

  constructor(
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllCategories();
    this.getAllProducts();
  }

  private getAllUsers() {
    this.usersService.getAll().subscribe({
      next: (count) => {
        this.usersCount = count.length;
      },
    });
  }
  private getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (count) => {
        this.productsCount = count.length;
      },
    });
  }
  private getAllCategories() {
    this.categoriesService.getAll().subscribe({
      next: (count) => {
        this.categoriesCount = count.length;
      },
    });
  }
}
