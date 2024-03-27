import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateService } from '../create.service';
import { Observable } from 'rxjs';
import { GetTemplate, Post_OptionList, Post_Question } from '../../shared/Models/Survey';

@Component({
  selector: 'app-templatepreview',
  templateUrl: './templatepreview.component.html',
  styleUrl: './templatepreview.component.css'
})
export class TemplatepreviewComponent {

  questionnumber : number = 1;
  question_list: Post_Question[] = [];
  templateId : number;
  templateName : string;
  constructor(@Inject(MAT_DIALOG_DATA) private data : any,private service : CreateService,private dialogRef : MatDialogRef<TemplatepreviewComponent>)
  {
    this.templateId = data.templateId;
    this.templateName = data.templateName;
    this.templateData();
  }

  templateData()
  {
    const data = this.service.getTemplateData(this.templateId) as Observable<GetTemplate[]>;
      data.subscribe((data) => {
        console.log(data);
        data.forEach(element => {
          const optionList: Post_OptionList[] = [];
          var count : number = 1;
          if(element.optionType == 1 || element.optionType ==2 )
          {
            element.options.forEach(options => {
              const option : Post_OptionList = {
                optionId : count,
                optionText : options.optionText,
                surveyId : Number(localStorage.getItem('surveyId'))
              }
              optionList.push(option);
              count++;
              
          });
          }
          const question : Post_Question = {
            questionId : this.questionnumber,
            questionText : element.questionText,
            questionOptionType : element.optionType,
            surveyId : Number(localStorage.getItem('surveyId')),
            options : optionList 
          }

          this.questionnumber = this.questionnumber + 1;
          
          this.question_list.push(question);
        });
      });
  }

  close()
  {
    this.dialogRef.close();
  }
}
