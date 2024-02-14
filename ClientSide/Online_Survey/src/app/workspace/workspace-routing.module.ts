import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DepartmentComponent } from './department/department.component';
import { SurveyerWorkspaceComponent } from './surveyer-workspace/surveyer-workspace.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
