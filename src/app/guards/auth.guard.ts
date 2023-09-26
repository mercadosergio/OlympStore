import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
    private tokenService= inject(TokenService)
    private router= inject(Router)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isValidToken = this.tokenService.isValidToken();
    console.log('Token valido: ', isValidToken);

    if (!isValidToken) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
    // return this.authService.user$
    //   .pipe(
    //     map(user => {
    //       if (!user) {
    //         this.router.navigate(['/home']);
    //         return false;
    //       }
    //       return true;
    //     })
    //   );
  }
}
