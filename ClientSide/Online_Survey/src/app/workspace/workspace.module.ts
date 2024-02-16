import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';
import { SurveyerWorkspaceComponent } from './surveyer-workspace/surveyer-workspace.component';
import { SidebarComponent } from './sidebar/sidebar.component';




@NgModule({
  declarations: [
    CompanyComponent,
    DepartmentComponent,
    SurveyerWorkspaceComponent,
    SidebarComponent

   
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  exports: [SidebarComponent],
})
export class WorkspaceModule { }
