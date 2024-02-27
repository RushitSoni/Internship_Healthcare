import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { GenerateSurveyComponent } from './generate-survey/generate-survey.component';
import { CompletionComponent } from './completion/completion.component';
import { SendComponent } from './send/send.component';
import { AuthorizationGuard } from '../shared/guards/authorization.guard';

const routes: Routes = [

  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthorizationGuard],
    children:[
      {path: 'generate',component:GenerateSurveyComponent},
      {path: 'generate/addquestion',component:AddQuestionComponent},
      {path: 'generate/complete',component:CompletionComponent},
      {path: 'send',component:SendComponent}
    ]
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
