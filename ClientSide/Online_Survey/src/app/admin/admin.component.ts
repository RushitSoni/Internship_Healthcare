import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  totalSurveys: number = 0;
  totalResponses: number = 0;
  totalUsers: number = 0;
  totalCompany: number = 0;

  constructor() { }


}
