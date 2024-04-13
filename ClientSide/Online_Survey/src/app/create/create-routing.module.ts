import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { GenerateSurveyComponent } from './generate-survey/generate-survey.component';
import { CompletionComponent } from './completion/completion.component';
import { SendComponent } from './send/send.component';
import { AuthorizationGuard } from '../shared/guards/authorization.guard';
import { preventBackGuard } from '../shared/guards/prevent-back.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    children: [
      { path: 'generate', component: GenerateSurveyComponent },
      {
        path: 'generate/addquestion',
        component: AddQuestionComponent,
        data: { source: 'generate' },
        canActivate: [preventBackGuard],
      },
      {
        path: 'generate/complete',
        component: CompletionComponent,
        data: { source: 'complete' },
        canActivate: [preventBackGuard],
      },
      { path: 'send', component: SendComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
