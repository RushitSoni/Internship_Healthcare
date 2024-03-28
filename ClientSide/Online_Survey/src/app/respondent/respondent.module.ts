import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespondentRoutingModule } from './respondent-routing.module';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';
import { FillComponent } from './fill/fill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';

@NgModule({
  declarations: [
    TakesurveyComponent,
    FillComponent,
    CompleteComponent
  ],
  imports: [
    CommonModule,
    RespondentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class RespondentModule { }