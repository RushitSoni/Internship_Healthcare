import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { GenerateSurveyComponent } from './generate-survey/generate-survey.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CompletionComponent } from './completion/completion.component';
import { WorkspaceModule } from '../workspace/workspace.module';


@NgModule({
  declarations: [
    AddQuestionComponent,
    GenerateSurveyComponent,
    CompletionComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    ReactiveFormsModule,
    WorkspaceModule
  ]
})
export class CreateModule { }
