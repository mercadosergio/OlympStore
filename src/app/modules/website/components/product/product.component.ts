import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/interfaces/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
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
