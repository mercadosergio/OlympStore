import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(): Observable<boolean> {
    return this.authService.user$
      .pipe(
        map(() => {
          // if (this.authService.user$.value?.role === 'admin') {
          //   console.log("Role: ", this.authService.user$.value?.role);
          // } else {
          //   this.router.navigate(['/home']);
          //   return false;
          // }
          return true;
        })
      )
  }

}
