import { Component, OnInit } from '@angular/core';
import { Product } from './models/interfaces/product.model';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
// Swiper
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = './assets/images/imagen.png';
  showImage = true;
  products: Product[] = [];

  user$ = this.authService.user$;
  token = this.tokenService.getToken();

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}
}
