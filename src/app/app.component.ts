import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
// Swiper
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = './assets/images/imagen.png';
  showImage = true; 
  products: Product[] = [];

  constructor(private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImage = !this.showImage;
  }
}
