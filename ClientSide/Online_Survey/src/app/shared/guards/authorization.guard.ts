import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';

import { User } from '../Models/user';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard  {

  constructor(private accountService:AccountService,private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.accountService.user$.pipe(
      map((user : User | null)=>{
          if(user){
            return true
          }
          else{
            this.router.navigate(['account/login'],{queryParams:{returnUrl:state.url}})
            return false
          }
      }
    ))
  }
  
}
