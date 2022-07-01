import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  // the Router call canActivate() method,
  // if canActivate is registered in Routes[]
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // here we check if user is logged in or not
    // the authService returs user object, or
    // it returns undefined/null when user is not logged in

    // SINCE OUR 'authService.user' IS OF TYPE 'Observable'
    // WE MUST USE 'subscribe' TO GET VALUE OF 'user'
    return new Promise((resolve, reject) => {
      // this.cookieService.subscribe((user) => {
      // here we check if user is logged in or not
      // the authService returs user object, or
      // it returns undefined/null when user is not logged in
      if (this.cookieService.get('user_data') !== '') {
        // just return false - if user is not logged in
        this.router.navigate(['dashboard']);
        return resolve(true);
      } else {
        // just return true - if user is logged in
        this.router.navigate(['/']);
        return resolve(false);
      }
      // });
    });
  }
}
