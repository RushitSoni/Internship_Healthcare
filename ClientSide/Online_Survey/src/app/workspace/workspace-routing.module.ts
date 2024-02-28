import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { SurveyerWorkspaceComponent } from './surveyer-workspace/surveyer-workspace.component';
import { AuthorizationGuard } from '../shared/guards/authorization.guard';

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
        path: 'company/:companyId',
        component: DepartmentComponent
      },
      
      {
        path: 'company/:companyId/:departmentId',
        component: SurveyerWorkspaceComponent
      }
    
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
