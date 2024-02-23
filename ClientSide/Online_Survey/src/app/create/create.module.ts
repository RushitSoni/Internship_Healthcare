import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { CreateRoutingModule } from './create-routing.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { GenerateSurveyComponent } from './generate-survey/generate-survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompletionComponent } from './completion/completion.component';

import { DisplayComponent } from './display/display.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { WorkspaceModule } from '../workspace/workspace.module';



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
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    WorkspaceModule

  ]
})
export class CreateModule { }
