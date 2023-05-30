import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, find, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

//blocks the route to the tool management panel for not authenticated users
export const toolsGuard = (state: RouterStateSnapshot) => {
    const service = inject(AuthenticationService);
    const route = inject(Router);
    return service.loginStatus.pipe(
        map((isLoggedIn) => {
            if (isLoggedIn == true) {
                return true;
            } else {
                console.log("could not load this route, log-in first")
                route.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        })
    );
};

//blocks the route to the admin panel for not authenticated users
export const adminGuard = () => {
    const service = inject(AuthenticationService);
    const user = JSON.parse(localStorage.getItem('user')!);
    let isAdmin: boolean = false;

    for (let i = 0; i < user?.authorities?.length; i++) {
        if (user?.authorities[i]?.authority === "ADMIN") {
            isAdmin = true;
            break;
        }
    }
    return service.loginStatus.pipe(
        map((isLoggedIn) => {
            if (isLoggedIn == true && isAdmin == true) {
                return true;
            } else {
                console.log("to use this property login as admin")
                return false;
            }
        })
    );
};
  

