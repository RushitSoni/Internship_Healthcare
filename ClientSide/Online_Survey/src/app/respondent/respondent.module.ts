import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespondentRoutingModule } from './respondent-routing.module';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';
import { FillComponent } from './fill/fill.component';


@NgModule({
  declarations: [
    TakesurveyComponent,
    FillComponent
  ],
  imports: [
    CommonModule,
    RespondentRoutingModule
  ]
})
export class RespondentModule { }
