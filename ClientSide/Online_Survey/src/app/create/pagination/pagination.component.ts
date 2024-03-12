import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateService } from '../create.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements AfterViewInit{
  
  displayedColumns: string[] = ['SurveyorId', 'SurveyName', 'CreateDate', 'StartDate', 'EndDate', 'DepartmentId'];
  dataSource = new MatTableDataSource<SurveyTable>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private service : CreateService)
  {

  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}

export interface SurveyTable {
  SurveyorId: number;
  SurveyName: string;
  CreateDate: string;
  StartDate: string;
  EndDate: string;
  DepartmentId: number;
}

