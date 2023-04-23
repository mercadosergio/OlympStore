import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('change just img => ', this.img);

    //code
  }
  @Input() alt: string = '';
  imageDefault = './assets/images/default.png';
  @Output() loaded = new EventEmitter<string>();
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // console.log('constructor', 'imgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges) {
    //inputs cambios - muchas veces
    // console.log('ngOnChanges', 'imgValue =>', this.img);
    // console.log('changes:', changes);

  }

  ngOnInit(): void {
    //una sola vez
    // console.log('ngOnInit', 'imgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000);
  }


  ngAfterViewInit() {
    //after render
    //handler children
    // console.log('ngAfterViewInit');
  }

  ngOnDestroy() {
    //delete
    // console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoad() {
    // console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
