import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Template } from '../../shared/Models/Respondent';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { CreateService } from '../create.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-template-display',
  templateUrl: './template-display.component.html',
  styleUrl: './template-display.component.css'
})
export class TemplateDisplayComponent implements OnInit , AfterViewInit {

  @Output() clicked : EventEmitter<number> = new EventEmitter<number>();
  surveyId! : number;
  template : Observable<Template[]> = new Observable<Template[]>;
  templateData : Template[] = [];
  displayedColumns: string[] = ['Index','surveyId','surveyName','action'];
  dataSource = new MatTableDataSource<Template>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private globalservice : GlobalserviceService,private service : CreateService)
  {

  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  async ngOnInit(): Promise<void> {
    this.template = this.service.getTemplate();
    this.template.subscribe(data => {
      this.dataSource.data = data;
      this.templateData = data;
    });

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }    

  addQuestions(questionNumber : number)
  {
    this.clicked.emit(questionNumber);
  }
}
