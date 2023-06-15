import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  displayedColumns: string[] = ['id', 'name', 'action'];
  categories!: MatTableDataSource<Category>;

  constructor(
    private cateoriesService: CategoriesService,
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


}