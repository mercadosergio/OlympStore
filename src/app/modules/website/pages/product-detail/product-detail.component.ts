import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/interfaces/product.model';
import { ProductsService } from 'src/app/services/products.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ViewEncapsulation, ViewChild } from '@angular/core';
// import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private location = inject(Location);

  faPrint = faPrint;
  thumbsSwiper: any;
  private pdf = new jsPDF();

  productId!: number;
  product: Product | null = null;

  newShoppingCart: Product[] = [];
  total = 0;

  constructor(private storeService: StoreService) {
    this.newShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.productId = Number(params.get('id'));
          if (this.productId) {
            return this.productService.getProduct(this.productId);
          }
          return [null];
        })
      )
      .subscribe((data) => {
        this.product = data;
      });
  }

  onAddShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  goToBack() {
    this.location.back();
  }

  valorY!: number;

  generarPdf() {
    let date: Date = new Date();

    this.pdf = new jsPDF('p', 'pt', 'letter');

    this.pdf.text('' + date.toLocaleString(), 550, 70, { align: 'right' });
    this.pdf.text('' + this.product!.name, 70, 140, { align: 'justify' });

    // const foto = new Image();
    // foto.src = this.product.images[0];
    // this.pdf.addImage(foto, this.product.images+"", 80, 82, 125, 50);

    const pr = String(this.product!.price);
    const precio = this.pdf.splitTextToSize('Precio: $' + pr, 450);
    this.pdf.text('' + precio, 70, 180);

    const categoria = this.pdf.splitTextToSize(
      'Categoria: ' + this.product!.category.name,
      450
    );
    this.pdf.text('' + categoria, 70, 210);

    const desc = this.product!.description;
    const description = this.pdf.splitTextToSize(desc, 450);
    this.pdf.text('' + desc, 70, 250, {
      lineHeightFactor: 1.5,
      align: 'justify',
      maxWidth: 470,
    });

    const logo = new Image();
    logo.src = 'assets/images/olymp-logo.png';
    this.pdf.addImage(logo, '', 80, 42, 125, 50);
    this.addWaterMark(this.pdf);
    window.open(URL.createObjectURL(this.pdf.output('blob')));
  }

  addWaterMark(pdf: jsPDF) {
    var totalPages = 1;
    let i: number;
    for (i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      //pdf.addImage(imgData, 'PNG', 40, 40, 75, 75);
      pdf.setTextColor(150);
      pdf.text('Olymp Store', 70, pdf.internal.pageSize.height - 30);
    }

    return pdf;
  }
}
