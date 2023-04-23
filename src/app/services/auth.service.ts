import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth, ResponseLogin } from '../models/auth.model';
import { CreateUserDTO, User } from '../models/user.model';
import { TokenService } from './token.service';
import { ILogin } from '../models/interfaces/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/auth/login`, {
      email,
      password
    })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.access_token);
          // this.tokenService.saveRefreshToken(response.refresh_token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/users`, {
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password)
      .pipe(
        switchMap(() => this.login(email, password))
      );
  }


  getProfile() {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`
      // ,{
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   // 'Content-type': 'application/json'
      // }
      // }
    ).pipe(
      tap(user => this.user.next(user))
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
  }
}
