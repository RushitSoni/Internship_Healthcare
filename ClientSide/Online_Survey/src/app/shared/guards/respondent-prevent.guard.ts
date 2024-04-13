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
export class respondentPreventGuard {
  constructor(
    private router: Router,
    private navigateService: RespondentNavigateService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(!this.navigateService.getLogin())
    {
      this.router.navigate(['/respondent/:surveyid']);
      return false;
    }
    return true;
  }
}
