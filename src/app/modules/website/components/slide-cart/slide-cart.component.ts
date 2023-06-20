import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-slide-cart',
  templateUrl: './slide-cart.component.html',
  styleUrls: ['./slide-cart.component.scss'],
  animations: [
    trigger('opacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('translateX', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class SlideCartComponent implements OnInit {

  faXmark = faXmark;
  counter: number = 0;
  shoppingCart: Product[] = [];
  isSlideoverVisible = true;

  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private storeService: StoreService,
  ) { }

  ngOnInit() {
    this.loadShoppingCart();
  }

  onToggleClick() {
    this.isSlideoverVisible = false;
    this.toggle.emit();
  }

  loadShoppingCart() {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
      this.shoppingCart = products;
    });
  }
}
