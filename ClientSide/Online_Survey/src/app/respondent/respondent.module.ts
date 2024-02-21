import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespondentRoutingModule } from './respondent-routing.module';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';


@NgModule({
  declarations: [
    TakesurveyComponent
  ],
  imports: [
    CommonModule,
    RespondentRoutingModule
  ]
})
export class RespondentModule { }
