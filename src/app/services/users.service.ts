import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/user.model';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/users`;

  constructor(private http: HttpClient) { }

  create(dto: CreateUserDTO): Observable<User> {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl, { context: checkToken() });
  }
}
