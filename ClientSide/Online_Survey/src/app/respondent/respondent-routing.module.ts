import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';
import { FillComponent } from './fill/fill.component';
import { AuthorizationGuard } from '../shared/guards/authorization.guard';
import { CompleteComponent } from './complete/complete.component';
import { respondentPreventGuard } from '../shared/guards/respondent-prevent.guard';
import { repondenpreventBackGuard } from '../shared/guards/repondenprevent-back.guard';
import { AlreadyFilledComponent } from './already-filled/already-filled.component';

const routes: Routes = [
  {path:':surveyid' , component: TakesurveyComponent},
  {path:':surveyid/fill',component: FillComponent,canActivate : [respondentPreventGuard,repondenpreventBackGuard]},
  {path:':surveyid/complete',component: CompleteComponent,canActivate : [respondentPreventGuard]},
  {path:':surveyid/filled',component: AlreadyFilledComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespondentRoutingModule { }
