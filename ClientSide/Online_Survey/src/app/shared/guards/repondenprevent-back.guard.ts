import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {  } from '../../create/navigateservice.service';
import { RespondentNavigateService } from '../../respondent/respondent-navigate.service';

@Injectable({
  providedIn: 'root',
})
export class repondenpreventBackGuard {
  constructor(
    private router: Router,
    private navigateService: RespondentNavigateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this.navigateService.getFillRoute() == 'fill')
    {
      return false;
    }
    else if(this.navigateService.getFillRoute() == 'completesurvey')
    {
      return false;
    }
    
    return true;
  }
};
