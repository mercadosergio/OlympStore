import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  newShoppingCart: Product[] = [];
  products: Product[] = [
    {
      id: '1',
      name: 'PC Gamer',
      price: 200,
      image: './assets/images/pc-gamer.png'
    },
    {
      id: '2',
      name: 'Portatil',
      price: 170,
      image: './assets/images/portatil1.png'
    },
    {
      id: '3',
      name: 'Headsets gaming',
      price: 57,
      image: './assets/images/headset1.png'
    },
    {
      id: '4',
      name: 'Bolso',
      price: 57,
      image: './assets/images/bolso.png'
    }
  ]
  ngOnInit(): void {
  }
  onAddShoppingCart(product: Product) {
    console.log(product);
    this.newShoppingCart.push(product);
  }
}
