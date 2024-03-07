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
import { MatDialogModule } from '@angular/material/dialog';
import { WorkspaceModule } from '../workspace/workspace.module';
import { SettimeComponent } from './settime/settime.component';
import { MatButtonModule } from '@angular/material/button';
import { SendComponent } from './send/send.component';
import { TemplatedetailComponent } from './templatedetail/templatedetail.component';
import { LinkComponent } from './link/link.component';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    AddQuestionComponent,
    GenerateSurveyComponent,
    CompletionComponent,
    DisplayComponent,
    SettimeComponent,
    SendComponent,
    TemplatedetailComponent,
    LinkComponent,
    AlertComponent
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
    WorkspaceModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class CreateModule { }
