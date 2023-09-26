import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/interfaces/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImgComponent } from '../img/img.component';
import { NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    standalone: true,
    imports: [RouterLink, NgIf, ImgComponent, FontAwesomeModule, CurrencyPipe]
})
export class ProductComponent {
  faEye = faEye;
  faShoppingCart = faShoppingCart;

  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    images: [],
    description: '',
    slug: '',
    category: {
      id: 0,
      name: '',
      image: '',
      slug: '',
    },
  };
  productId: string = String(this.product.id);

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.productId);
  }
}
