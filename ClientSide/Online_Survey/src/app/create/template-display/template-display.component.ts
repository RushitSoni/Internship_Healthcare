import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Template } from '../../shared/Models/Respondent';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { CreateService } from '../create.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TemplatepreviewComponent } from '../templatepreview/templatepreview.component';

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
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private globalservice : GlobalserviceService,private service : CreateService,private matDialog : MatDialog)
  {}

  ngAfterViewInit(): void {
  }

  ngOnInit(){
    this.load();
  }    

  load()
  {
    this.template = this.service.getTemplate();
    this.template.subscribe(data => {
      this.templateData = data;
      this.dataSource = new MatTableDataSource<any>(this.templateData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(templateId : number)
  {
    this.service.deleteTemplate(templateId).subscribe((data) => {
      this.load();
    });
  }

  addQuestions(questionNumber : number)
  {
    this.clicked.emit(questionNumber);
  }

  preview(templateId : number,templateName : string)
  {
    const dialogRef = this.matDialog.open(TemplatepreviewComponent,{
      data : {templateId,templateName},
      width: '50%',
      height: '60%',
      disableClose: true
    });
    
  }
}
