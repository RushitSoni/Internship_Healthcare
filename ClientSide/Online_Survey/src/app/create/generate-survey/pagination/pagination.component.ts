import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgClass } from '@angular/common';
import { log } from 'console';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-pagination',
  styleUrl: './pagination.component.css',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, NgClass],
})
export class PaginationComponent implements AfterViewInit {
  displayedColumns: string[] = ['SurveyorId', 'SurveyName', 'Description', 'CreateDate', 'StartDate', 'EndDate', 'DepartmentId'];
  dataSource = new MatTableDataSource<SurveyTable>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}

export interface SurveyTable {
  SurveyorId: number;
  SurveyName: string;
  Description: string;
  CreateDate: string;
  StartDate: string;
  EndDate: string;
  DepartmentId: number;
}

const ELEMENT_DATA: SurveyTable[] = [
  { SurveyorId: 1, SurveyName: "Survey 1", Description: "This is the first survey", CreateDate: "2022-01-01", StartDate: "2022-01-10", EndDate: "2025-01-20", DepartmentId: 1 },
  { SurveyorId: 2, SurveyName: "Survey 2", Description: "This is the second survey", CreateDate: "2022-02-01", StartDate: "2022-02-10", EndDate: "2022-02-20", DepartmentId: 2 },
  { SurveyorId: 3, SurveyName: "Survey 3", Description: "This is the third survey", CreateDate: "2022-03-01", StartDate: "2022-03-10", EndDate: "2022-03-20", DepartmentId: 3 },
  { SurveyorId: 4, SurveyName: "Survey 4", Description: "This is the fourth survey", CreateDate: "2022-04-01", StartDate: "2022-04-10", EndDate: "2022-04-20", DepartmentId: 4 },
  { SurveyorId: 5, SurveyName: "Survey 5", Description: "This is the fifth survey", CreateDate: "2022-05-01", StartDate: "2022-05-10", EndDate: "2022-05-20", DepartmentId: 5 },
  { SurveyorId: 6, SurveyName: "Survey 6", Description: "This is the sixth survey", CreateDate: "2022-06-01", StartDate: "2022-06-10", EndDate: "2022-06-20", DepartmentId: 6 },
  { SurveyorId: 7, SurveyName: "Survey 7", Description: "This is the seventh survey", CreateDate: "2022-07-01", StartDate: "2022-07-10", EndDate: "2022-07-20", DepartmentId: 7 },
  { SurveyorId: 8, SurveyName: "Survey 8", Description: "This is the eighth survey", CreateDate: "2022-08-01", StartDate: "2022-08-10", EndDate: "2022-08-20", DepartmentId: 8 },
  { SurveyorId: 9, SurveyName: "Survey 9", Description: "This is the ninth survey", CreateDate: "2022-09-01", StartDate: "2022-09-10", EndDate: "2022-09-20", DepartmentId: 9 },
  { SurveyorId: 10, SurveyName: "Survey 10", Description: "This is the tenth survey", CreateDate: "2022-10-01", StartDate: "2022-10-10", EndDate: "2022-10-20", DepartmentId: 10 }
];