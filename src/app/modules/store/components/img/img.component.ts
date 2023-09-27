import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
  standalone: true,
  imports: [NgIf, NgOptimizedImage],
})
export class ImgComponent {
  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Input() alt: string = '';
  imageDefault = './assets/images/default.png';
  @Output() loaded = new EventEmitter<string>();

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoad() {
    // console.log('log hijo');
    this.loaded.emit(this.img);
  }
}
