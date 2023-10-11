import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/interfaces/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsComponent } from '../../components/products/products.component';
import { ProductComponent } from '../../components/product/product.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ProductsComponent, ProductComponent, NgFor],
})
export class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);
  private el = inject(ElementRef);

  featuredProducts: Product[] = [];
  limit: number = 10;
  offset: number = 0;
  productId: string | null = null;

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0).subscribe((data) => {
      this.featuredProducts = data;
      this.offset += this.limit;
    });

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }
}
