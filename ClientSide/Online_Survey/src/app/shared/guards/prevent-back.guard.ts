import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NavigateserviceService } from '../../create/navigateservice.service';

@Injectable({
  providedIn: 'root',
})
export class preventBackGuard {
  constructor(
    private router: Router,
    private navigateService: NavigateserviceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.navigateService.getSourcePage() == 'complete') {
      localStorage.removeItem('surveyId');
      this.router.navigate(['create/generate'],{replaceUrl : true});
      return false;
    }
    return true;
  }
}
