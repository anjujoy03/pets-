import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(
    private router: Router,
  
) { }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const CurrentUser=localStorage.getItem('user_type')

      if(CurrentUser){
        console.log(route.data);
        if(localStorage.getItem('user_id') && route.data.roles && route.data.roles.indexOf(CurrentUser) !== -1){

          return true;
        }
        else{
          this.router.navigate(['/login']);
          return false;
          
          
        }

      }
      return false

  }
}