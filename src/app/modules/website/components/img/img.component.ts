import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-img',
    templateUrl: './img.component.html',
    styleUrls: ['./img.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class ImgComponent {
  img: string = '';

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
