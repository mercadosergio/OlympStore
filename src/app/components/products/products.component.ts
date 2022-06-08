import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private storeService: StoreService) {

    this.newShoppingCart = this.storeService.getShoppingCart();
  }

  newShoppingCart: Product[] = [];
  total = 0;
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
    // this.newShoppingCart.push(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
