import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Category,
  CreateCategoryDTO,
} from '../models/interfaces/category.model';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environment.API_URL}/api/v1/categories`;
  private http = inject(HttpClient);

  create(dto: CreateCategoryDTO): Observable<Category> {
    let formData = new FormData();
    formData.append('name', dto.name);
    formData.append('imageFile', dto.image);

    return this.http.post<Category>(`${this.apiUrl}`, formData, {
      context: checkToken(),
    });
  }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('linit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Category[]>(`${this.apiUrl}`, { params }).pipe(
      map((categories) => {
        return categories.map((category) => {
          category.image =
            category.image.startsWith('http://') ||
            category.image.startsWith('https://')
              ? category.image
              : `${environment.API_URL}\\api\\v1\\` + category.image;
          return category;
        });
      })
    );
  }

  delete(id: number) {
    return this.http.delete<Category>(`${this.apiUrl}/${id}`);
  }

  // edit(id: number) {
  //   return this.http.put<Category>(`${this.apiUrl}/${id}`);
  // }
}
