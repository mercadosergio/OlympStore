import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tienda';
  imgParent = './assets/images/imagen.png';
  showImage = true;
  products: Product[] = [];

  constructor() { }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImage = !this.showImage;
  }
}
