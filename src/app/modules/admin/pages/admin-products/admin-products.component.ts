import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

export interface TableProducts {
  id: string;
  title: string;
  price: number;
  images: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, AfterViewInit {
  products: Product[] = [];

  displayedColumns: string[] = ['id', 'image', 'title', 'price', 'description', 'category', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  constructor(private productService: ProductsService, private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe((data: any) => {
        this.products = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // private getProducts(product: Product[]): TableProducts[] {
  //   const dataTable = product.map<TableProducts>((element) => {
  //     return {
  //       id: element.id,
  //       images: element.images[0],
  //       title: element.title,
  //       price: element.price,
  //       description: element.description,
  //       category: element.category.name,
  //     };

  //   });
  //   return dataTable;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
