import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { ViewEncapsulation, ViewChild } from "@angular/core";
// import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {
  thumbsSwiper: any;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private location: Location) { }

  private pdf = new jsPDF();

  productId: string | null = null;
  product: Product | null = null;

  @Output() addedProduct = new EventEmitter<Product>();

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.productId = params.get('id');
          if (this.productId) {
            return this.productService
              .getProduct(this.productId);
          }
          return [null];
        }),
      )
      .subscribe((data) => {
        this.product = data;
        console.log(data);
      });
  }

  onAddToCart() {
    this.addedProduct.emit(this.product!);
  }

  goToBack() {
    this.location.back();
  }

  valorY!: number;

  generarPdf() {
    let date: Date = new Date();

    this.pdf = new jsPDF('p', 'pt', 'letter');

    this.pdf.text("" + date.toLocaleString(), 550, 70, { align: 'right', });
    this.pdf.text("" + this.product!.title, 70, 140, { align: 'justify', });

    // const foto = new Image();
    // foto.src = this.product.images[0];
    // this.pdf.addImage(foto, this.product.images+"", 80, 82, 125, 50);

    const pr = String(this.product!.price);
    const precio = this.pdf.splitTextToSize("Precio: $" + pr, 450);
    this.pdf.text("" + precio, 70, 180);


    const categoria = this.pdf.splitTextToSize("Categoria: " + this.product!.category.name, 450);
    this.pdf.text("" + categoria, 70, 210);

    const desc = this.product!.description;
    const description = this.pdf.splitTextToSize(desc, 450);
    this.pdf.text("" + desc, 70, 250, {
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