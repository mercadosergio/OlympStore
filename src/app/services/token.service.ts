import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  saveToken(token: string) {
    setCookie('olymp-token', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('olymp-token');
    return token;
  }

  removeToken() {
    removeCookie('olymp-token');
  }

  removeRefreshToken() {
    removeCookie('refresh-olymp-token');
  }

  saveRefreshToken(token: string) {
    setCookie('refresh-olymp-token', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token = getCookie('refresh-olymp-token');
    return token;
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
