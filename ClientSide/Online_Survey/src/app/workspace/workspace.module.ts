import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { CompanyComponent } from './company/company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentComponent } from './department/department.component';
import { SurveyerWorkspaceComponent } from './surveyer-workspace/surveyer-workspace.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditCompanyComponent } from './add-edit-company/add-edit-company.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddEditDepartmentComponent } from './add-edit-department/add-edit-department.component';
import { SurveyerListComponent } from './surveyer-list/surveyer-list.component';
import { AddEditSurveyerComponent } from './add-edit-surveyer/add-edit-surveyer.component';



@NgModule({
  declarations: [
    CompanyComponent,
    DepartmentComponent,
    SurveyerWorkspaceComponent,
    SidebarComponent,
    AddEditCompanyComponent,
    AddEditDepartmentComponent,
    SurveyerListComponent,
    AddEditSurveyerComponent,
  
  ],
  imports: [
    MatIconModule,
    CommonModule,
    WorkspaceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
    
  ],
  exports: [SidebarComponent],
})
export class WorkspaceModule {}
