import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/interfaces/product.model';
import { catchError, retry, throwError, map, zip, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';
import { CreateProductImageDTO, ProductImage } from '../models/interfaces/product-image.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/v1/products`;
  private apiProductImageUrl = `${environment.API_URL}/api/v1/products/images`;
  private apiUrlCategory = `${environment.API_URL}/api/v1/categories`;

  constructor(private http: HttpClient) { }

  getByCategory(categoryId: number, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrlCategory}/${categoryId}/products`, { params });
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.apiUrl, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: 0.19 * item.price
          }
        }))
      );
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  fetchReadAndUpdate(id: number, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProduct(id: number) {
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
    return this.http.post<Product>(this.apiUrl, dto, { context: checkToken() });
  }

  addImageToProduct(position: number, productId: number, imageFile: Blob): Observable<ProductImage> {
    let formData = new FormData();
    formData.append('position', position.toString());
    formData.append('productId', productId.toString());
    formData.append('imageFile', imageFile);

    return this.http.post<ProductImage>(`${this.apiProductImageUrl}/upload`, formData, {context: checkToken()});
  }

  update(id: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset }
    });
  }
}
