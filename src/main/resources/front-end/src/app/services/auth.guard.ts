import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export const authGuard = () => {
  const service = inject(AuthenticationService);
  const route= inject(Router);
    return service.isLoggedIn().pipe(
      map((isLogged) => {
        if (isLogged == true) {
          return true;
        } else {
          route.navigateByUrl('/');
          return false;
        }
      })
    );
};
  

