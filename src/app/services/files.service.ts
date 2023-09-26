import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface File {
  originalName: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = `http://localhost:8000/api/v1/products/images`;
  // private apiUrl = ` https://young-sands-07814.herokuapp.com/api/files`;

  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  addImageToProduct(position: number, productId: number, imageFile: Blob) {
    const dto = new FormData();

    dto.append('imageFile', imageFile);
    dto.append('position', position.toString());
    dto.append('productId', productId.toString());
    return this.http.post<File>(`${this.apiUrl}/upload`, dto);
  }
  // uploadFile(file: Blob) {
  //   const dto = new FormData();
  //   const position = 20000;
  //   const productId = 1;

  //   dto.append('imageFile', file);
  //   dto.append('position', position.toString());
  //   dto.append('productId', productId.toString());
  //   return this.http.post<File>(`${this.apiUrl}/upload`, dto);
  // }
}
