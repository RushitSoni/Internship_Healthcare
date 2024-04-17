import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { WorkspaceService } from '../workspace/workspace.service';
import { HelpModuleService } from '../help-module/help-module.service';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  totalSurveys: number = 0;
  totalResponses: number = 0;
  totalUsers: number = 0;
  totalCompany: number = 0;

  constructor(private workspaceService:WorkspaceService,private helpService:HelpModuleService,private adminService:AdminService) { }

 ngOnInit(): void {

  this.loadData()
   
 }

loadData(){
  this.workspaceService.getAllUsers().subscribe((res)=>{
    this.totalUsers=res.length
  })

  this.workspaceService.getAllCompanies().subscribe((res)=>{
    this.totalCompany=res.length
  })

  this.workspaceService.getAllSurveys().subscribe((res)=>{
    this.totalSurveys=res.length
  })

  this.workspaceService.getAllResponses().subscribe((res)=>{
    this.totalResponses=res.length
  })
}


/*cut from below */

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.helpService.uploadFile(file).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Handle success, e.g., show a success message
      },
      (error) => {
        console.error('Error uploading file:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
}

generateUserReport() {
  this.adminService.generateUserReport()
    .subscribe(
      (reportFile: Blob) => {
        // Download the generated Excel file
        const blobUrl = window.URL.createObjectURL(reportFile);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'Users.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
      },
      error => {
        console.error('Error generating report:', error);
        // Handle error
      }
    );
}
generateWorkspaceReport() {
  this.adminService.generateWorkspaceReport()
    .subscribe(
      (reportFile: Blob) => {
        // Download the generated Excel file
        const blobUrl = window.URL.createObjectURL(reportFile);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'Workspace.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
      },
      error => {
        console.error('Error generating report:', error);
        // Handle error
      }
    );
}
generateSurveyReport() {
  this.adminService.generateSurveyReport()
    .subscribe(
      (reportFile: Blob) => {
        // Download the generated Excel file
        const blobUrl = window.URL.createObjectURL(reportFile);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'Surveys.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
      },
      error => {
        console.error('Error generating report:', error);
        // Handle error
      }
    );
}
generateRespondentReport() {
  this.adminService.generateRespondentReport()
    .subscribe(
      (reportFile: Blob) => {
        // Download the generated Excel file
        const blobUrl = window.URL.createObjectURL(reportFile);
        const anchor = document.createElement('a');
        anchor.href = blobUrl;
        anchor.download = 'Responses.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
      },
      error => {
        console.error('Error generating report:', error);
        // Handle error
      }
    );
}
}
