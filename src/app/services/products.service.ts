import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;
  private apiUrlCategory = `${environment.API_URL}/api/categories`;

  constructor(private http: HttpClient) { }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrlCategory}/${categoryId}/products/`, { params })
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('linit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}`, { params })
      .pipe(
        retry(3)
      );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError('Algo esta fallando en el server');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError('El producto no existe');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError('No estas permitido');
          }
          return throwError('Ups algo salio mal');
        })
      )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  // update(id: string, dto: UpdateProductDTO) {
  //   return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  // }

  delete(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }
}
