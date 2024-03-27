import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { WorkspaceService } from '../workspace/workspace.service';

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

  constructor(private workspaceService:WorkspaceService) { }

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
}
