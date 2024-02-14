import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-surveyer-workspace',
  templateUrl: './surveyer-workspace.component.html',
  styleUrl: './surveyer-workspace.component.css'
})
export class SurveyerWorkspaceComponent implements OnInit{

  departmentId: string = ""

  constructor(private route: ActivatedRoute){}


  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('departmentId') || '';
  }

}
