import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validate();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.validate();
  }
  validate() {
    let user: any = localStorage.getItem('user');

    if (user) {
      user = JSON.parse(user);
      if (user.role == 'admin') {
        return true;
      } else {
        // navigate to profile page
        this.router.navigate(['profile'])

        return false;
      }
    } else {
      // navigate to login page
      this.router.navigate(['/login'])

      return false;
    }
  }

}
