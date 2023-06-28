import { Injectable } from '@angular/core';
import { ProductImage } from '../models/interfaces/product-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageDropService {
  bufferSpace: number = 65535;

  constructor() { }

  getPosition(cards: ProductImage[], currentIndex: number) {
    if (cards.length === 1) {
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[1].position;//anterior card
      return onTopPosition / 2;
    }

    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      const prevPosition = cards[currentIndex - 1].position;
      const nextPosition = cards[currentIndex + 1].position;
      return (prevPosition + nextPosition) / 2;
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition = cards[lastIndex - 1].position;
      return (onBottomPosition + this.bufferSpace);
    }
    return 0;
    // console.log(cards, ' index: ', currentIndex);
  }

  getPositionNewItem(elements: ProductImage[]) {
    if (elements.length === 0) {
      return this.bufferSpace;
    }
    const lastIndex = elements.length - 1;
    const onBottomPosition = elements[lastIndex].position;
    return (onBottomPosition + this.bufferSpace);
  }

}
