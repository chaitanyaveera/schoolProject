import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('token');
    console.log(route?.routeConfig?.path, "this is file")
    if (route?.routeConfig?.path == 'login') {
      console.log(token, "hello")
      if (token) {
        this.router.navigate(['picmysloar']);
        return false;
      }
    } else {
      // console.log(route?.routeConfig?.path, "else helo")
      if (!token) {
        this.router.navigate(['login']);
        return false;
      }
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return true;
  }
}
