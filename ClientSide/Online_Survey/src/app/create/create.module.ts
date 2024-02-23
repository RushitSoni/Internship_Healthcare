import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { CreateRoutingModule } from './create-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { GenerateSurveyComponent } from './generate-survey/generate-survey.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompletionComponent } from './completion/completion.component';
import { DisplayComponent } from './display/display.component';


@NgModule({
  declarations: [
    AddQuestionComponent,
    GenerateSurveyComponent,
    CompletionComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    ClipboardModule,
  ]
})
export class CreateModule { }
