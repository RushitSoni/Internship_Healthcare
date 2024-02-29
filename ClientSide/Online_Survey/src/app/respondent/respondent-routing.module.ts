import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';
import { FillComponent } from './fill/fill.component';

const routes: Routes = [
  {path:':surveyid' , component: TakesurveyComponent},
  {path:':surveyid/fill',component: FillComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespondentRoutingModule { }
