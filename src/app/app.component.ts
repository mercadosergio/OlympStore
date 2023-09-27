import { Component, inject } from '@angular/core';
import { Product } from './models/interfaces/product.model';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './modules/shared/components/spinner/spinner.component';
// Swiper
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
})
export class AppComponent {
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);

  imgParent = './assets/images/imagen.png';
  showImage = true;
  products: Product[] = [];

  user$ = this.authService.user$;
  token = this.tokenService.getToken();
}
