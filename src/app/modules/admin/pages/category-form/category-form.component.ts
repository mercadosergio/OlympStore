import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  title: string = '';
  actionButton: string = '';
  categoryId: number = 0;
  categoryForm!: FormGroup;

  constructor(
    private categoryService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.isUpdate) {
      this.title = 'Editar categoria';
      this.actionButton = 'Actualizar';
    } else {
      this.title = 'Agregar categoria';
      this.actionButton = 'Guardar';
    }
  }

  action() {
    if (this.isUpdate) {
      this.editCategory();
    } else {
      this.addCategory();
    }
  }

  addCategory() {

  }

  editCategory() {

  }

  loadForm() {
    this.categoryForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
    });
  }

  loadEditForm() {

  }

  get isUpdate(): boolean {
    return this.router.url.includes('edit-category');
  }
}
