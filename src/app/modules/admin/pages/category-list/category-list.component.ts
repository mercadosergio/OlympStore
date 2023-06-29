import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/interfaces/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ModalDeleteCategoryComponent } from '../../components/modal-delete-category/modal-delete-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  displayedColumns: string[] = ['id', 'image', 'name', 'action'];
  categories!: MatTableDataSource<Category>;

  constructor(
    private cateoriesService: CategoriesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.cateoriesService.getAll()
      .subscribe({
        next: (data) => {
          this.categories = new MatTableDataSource(data);
        },
        error: (error) => { }
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
    })
  }
}
