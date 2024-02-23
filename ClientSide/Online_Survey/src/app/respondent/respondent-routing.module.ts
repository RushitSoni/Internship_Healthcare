import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';

const routes: Routes = [
  {path:':surveyid' , component: TakesurveyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespondentRoutingModule { }
