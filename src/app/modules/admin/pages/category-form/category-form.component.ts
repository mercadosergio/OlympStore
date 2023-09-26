import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCategoryDTO } from 'src/app/models/interfaces/category.model';
import { AlertService } from 'src/app/services/alert.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  private categoryService = inject(CategoriesService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private alertService = inject(AlertService);

  title: string = '';
  actionButton: string = '';
  categoryId: number = 0;
  categoryForm!: FormGroup;

  ngOnInit(): void {
    this.loadForm();
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
    this.categoryService.create(this.currentCategory).subscribe({
      next: () => {
        this.alertService.showAlert('Categoria creada', 'Listo');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  editCategory() {}

  loadForm() {
    this.categoryForm = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      image: [null],
    });
  }

  loadEditForm() {}

  get isUpdate(): boolean {
    return this.router.url.includes('edit-category');
  }

  get currentCategory(): CreateCategoryDTO {
    return {
      name: this.categoryForm.controls['name'].value,
      image: this.categoryForm.controls['image'].value,
    };
  }
  file!: File;
  filePreview!: string | ArrayBuffer | null;

  onUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.file = file;

      this.filePreview = null;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.filePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
