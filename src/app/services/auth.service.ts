import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkToken } from '../interceptors/token.interceptor';
import { Auth } from '../models/interfaces/auth.model';
import { User } from '../models/interfaces/user.model';
import { TokenService } from './token.service';
import { Customer } from '../models/interfaces/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1`;
  user$ = new BehaviorSubject<User | null>(null);
  customer$ = new BehaviorSubject<Customer | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getDataUser() {
    return this.user$.getValue();
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/auth/login`, {
      email,
      password
    })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.access_token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/users`, {
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password)
      .pipe(
        switchMap(() => this.loginAndGet(email, password))
      );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`, { context: checkToken() })
      .pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
  }

  getCustomerByUserId() {
    return this.http.get<Customer>(`${this.apiUrl}/auth/profile/customers`, { context: checkToken() })
      .pipe(
        tap(customer => {
          this.customer$.next(customer);
        })
      );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile()),
      )
  }

  logout() {
    this.tokenService.removeToken();
    this.user$.next(null);
  }
}
