import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { SurveyerWorkspaceComponent } from './surveyer-workspace/surveyer-workspace.component';
import { AuthorizationGuard } from '../shared/guards/authorization.guard';
import { SurveyerListComponent } from './surveyer-list/surveyer-list.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';


const routes: Routes = [

  
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthorizationGuard],
    children:[
      {
        path: 'company',
        component: CompanyComponent
      },
      {
        path:'company/questionbank',
        component:QuestionBankComponent
      },
      {
        path: 'company/:companyId',
        component: DepartmentComponent
      },
      
      {
        path: 'company/:companyId/:departmentId',
        component: SurveyerWorkspaceComponent
      },
      {
        path: 'company/:companyId/:departmentId/surveyers',
        component: SurveyerListComponent
      }
     
    
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
