import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, input } from '@angular/core';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { QuestionOption, template_detail } from '../../shared/Models/Survey';
import { CreateService } from '../create.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplatedetailComponent } from '../templatedetail/templatedetail.component';
import { Observable } from 'rxjs';
import { LinkComponent } from '../link/link.component';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrl: './completion.component.css'
})
export class CompletionComponent implements OnInit {
  
  questions! : QuestionOption[]; 
  inputUrl : string = '';
  
  constructor( private globalservice : GlobalserviceService , private service : CreateService,private dialog : MatDialog) {}
  
  ngOnInit(): void {
    const data = this.service.getData() as Observable<QuestionOption[]>;
    data.subscribe(data => {
      this.questions = data;
    });
  }

  AddTemplate(result : string)
  {
    const Id = localStorage.getItem('surveyorId');

    const survey_detail : template_detail = {
      surveyorid : Id ? JSON.parse(Id) : undefined,
      surveyid : Number(localStorage.getItem('surveyId')),
      surveyname : result,
      questions : this.questions
    };
    this.service.setQuestionOption(survey_detail);
    this.service.addTemplate().subscribe((data) => {
      console.log(data);
    })
    console.log(this.service.getQuestionOption());
  }

  Link()
  {
    const dialogRef = this.dialog.open(LinkComponent ,{
      width: '80%',
      height: '20%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.inputUrl = result;
    })
  }

  SaveTemplate()
  {
    const dialogRef = this.dialog.open(TemplatedetailComponent, {
      width: '80%',
      height: '30%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result); // Data passed back from dialog
      this.AddTemplate(result);
    });
  }
}
