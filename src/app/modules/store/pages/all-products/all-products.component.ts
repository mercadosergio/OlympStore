import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../../components/products/products.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/interfaces/product.model';
import { ParseFloatsPipe } from 'src/app/modules/shared/pipes/parse-floats.pipe';
import {
  FilterBarComponent,
  PriceRanges,
} from '../../components/filter-bar/filter-bar.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductsComponent,
    ParseFloatsPipe,
    FilterBarComponent,
  ],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);

  products: Product[] = [];
  limit: number = 10;
  offset: number = 0;
  productId: string | null = null;

  ngOnInit(): void {
    this.loadProducts();
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.productId = params.get('product');
    });
  }

  loadProducts(minPrice?: number, maxPrice?: number) {
    this.productsService
      .getProductsByPage(10, 0, minPrice, maxPrice)
      .subscribe((data) => {
        this.products = data;
        this.offset += this.limit;
      });
  }

  onLoadProducts(priceRanges: PriceRanges) {
    this.loadProducts(priceRanges.minPrice, priceRanges.maxPrice);
  }

  onLoadMore() {
    this.productsService
      .getProductsByPage(this.limit, this.offset)
      .subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }
}
