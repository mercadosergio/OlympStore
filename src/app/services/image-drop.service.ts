import { Injectable } from '@angular/core';
import { ProductImage } from '../models/interfaces/product-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageDropService {
  bufferSpace: number = 65535;

  images: ProductImage[] = [
    {
      id: 1,
      position: 65535,
      imagePath: 'https://placeimg.com/640/480/arch?r=0.2991954185522592'
    },
    {
      id: 2,
      position: 131070,
      imagePath: 'https://placeimg.com/640/480/arch?r=0.31741047346944207'
    },
    {
      id: 3,
      position: 196605,
      imagePath: 'https://placeimg.com/640/480/any?r=0.48336712707646057'
    },
    {
      id: 4,
      position: 262140,
      imagePath: 'https://placeimg.com/640/480/any?r=0.43074693338976044'
    },
    {
      id: 5,
      position: 327675,
      imagePath: 'http://placeimg.com/640/480/any?r=0.2532809177347606'
    },
  ];

  constructor() { }

  getImages() {
    return this.images;
  }

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
