import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/interfaces/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ModalDeleteProductComponent } from '../../../components/modal-delete-product/modal-delete-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

export interface TableProducts {
  id: string;
  name: string;
  price: number;
  images: string;
  description: string;
  category: string;
}

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
    standalone: true,
    imports: [RouterLink, MatTableModule, MatSortModule, FontAwesomeModule, MatPaginatorModule]
})
export class ProductsListComponent implements OnInit {
  private productService = inject(ProductsService);
  private _liveAnnouncer = inject(LiveAnnouncer);
  public dialog = inject(MatDialog);

  products: Product[] = [];

  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'price',
    'description',
    'category',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDeleteModal(data: Product) {
    const dialogRef = this.dialog.open(ModalDeleteProductComponent, {
      disableClose: true,
      minWidth: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
  }
}
