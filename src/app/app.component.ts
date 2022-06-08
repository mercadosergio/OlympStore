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
  products: Product[] = [
    // {
    //   id: '1',
    //   name: 'Bolso',
    //   price: 57,
    //   image: './assets/images/bolso.png'
    // },
    // {
    //   id: '2',
    //   name: 'Bolso',
    //   price: 57,
    //   image: './assets/images/bolso.png'
    // },
    // {
    //   id: '3',
    //   name: 'Bolso',
    //   price: 57,
    //   image: './assets/images/bolso.png'
    // },
    // {
    //   id: '4',
    //   name: 'Bolso',
    //   price: 57,
    //   image: './assets/images/bolso.png'
    // }
  ]
  onLoaded(img: string) {
    console.log('log padre', img);

  }

  toggleImg() {
    this.showImage = !this.showImage;
  }
}
