import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';

import { User } from '../Models/user';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class adminAuthGuard  {

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          // Assuming user roles are stored in the User object
          if (user.role && user.role.includes('superadmin')) {
            return true; // Allow access to /admin route if user has admin role
          } else {
            // Redirect to unauthorized page or handle unauthorized access
            this.router.navigate(['/unauthorized']);
            return false;
          }
        } else {
          // User is not authenticated, redirect to login page
          this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
}
