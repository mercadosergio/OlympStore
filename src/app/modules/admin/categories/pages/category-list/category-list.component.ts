import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/interfaces/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import { ModalDeleteCategoryComponent } from '../../../components/modal-delete-category/modal-delete-category.component';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
    standalone: true,
    imports: [RouterLink, MatTableModule, MatSortModule, FontAwesomeModule, MatPaginatorModule]
})
export class CategoryListComponent implements OnInit {
  private cateoriesService = inject(CategoriesService);
  public dialog = inject(MatDialog);

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  displayedColumns: string[] = ['id', 'image', 'name', 'action'];
  categories!: MatTableDataSource<Category>;

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.cateoriesService.getAll().subscribe({
      next: (data) => {
        this.categories = new MatTableDataSource(data);
      },
      error: (error) => {},
    });
  }

  onDeleteCategory(data: Category) {
    const dialogRef = this.dialog.open(ModalDeleteCategoryComponent, {
      disableClose: true,
      minWidth: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCategories();
    });
  }
}
