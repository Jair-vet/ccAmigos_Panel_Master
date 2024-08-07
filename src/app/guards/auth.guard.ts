import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate() {
    return this._authService.validateToken().pipe(
      tap((isAuth) => {
        // console.log(isAuth);
        if (!isAuth ) {
          this._router.navigateByUrl('auth/login');
        }
      })
    );
  }
}

export const AuthGuard: CanActivateFn = () => {
  return inject(PermissionsService).canActivate();
};
