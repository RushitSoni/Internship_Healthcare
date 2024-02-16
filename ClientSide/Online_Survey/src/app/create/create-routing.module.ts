import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { GenerateSurveyComponent } from './generate-survey/generate-survey.component';
import { CompletionComponent } from './completion/completion.component';

const routes: Routes = [
  {path: 'generate',component:GenerateSurveyComponent},
  {path: 'generate/addquestion',component:AddQuestionComponent},
  {path: 'generate/complete',component:CompletionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
