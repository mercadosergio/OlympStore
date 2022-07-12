import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {


  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();


  private pdf = new jsPDF();

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }

  valorY!: number;

  generarPdf() {
    let date: Date = new Date();

    this.pdf = new jsPDF('p', 'pt', 'letter');

    this.pdf.text("" + date.toLocaleString(), 550, 70, { align: 'right', });
    this.pdf.text("" + this.product.title, 70, 140, { align: 'justify', });

    // const foto = new Image();
    // foto.src = this.product.images[0];
    // this.pdf.addImage(foto, this.product.images+"", 80, 82, 125, 50);


    const pr = String(this.product.price);
    const precio = this.pdf.splitTextToSize("Precio: $" + pr, 450);
    this.pdf.text("" + precio, 70, 180);


    const categoria = this.pdf.splitTextToSize("Categoria: " + this.product.category.name, 450);
    this.pdf.text("" + categoria, 70, 210);

    const desc = this.product.description;
    const description = this.pdf.splitTextToSize(desc, 450);
    this.pdf.text("" + desc, 70, 250, {
      lineHeightFactor: 1.5,
      align: 'justify',
      maxWidth: 470,
    });

    const logo = new Image();
    logo.src = 'assets/images/olymp-logo-t.png';
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
