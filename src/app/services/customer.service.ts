import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { checkToken } from '../interceptors/token.interceptor';
import { Customer } from '../models/interfaces/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = `${environment.API_URL}/api/v1/customers`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Customer[]>(this.apiUrl, { context: checkToken() });
  }

  getCustomer(id: number) {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  getCustomerByUserId(userId: number) {
    return this.http.get<Customer>(`${this.apiUrl}/user/${userId}`);
  }
}
