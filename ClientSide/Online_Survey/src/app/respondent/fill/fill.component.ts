import { Component } from '@angular/core';
import { Answer, QuestionOption } from '../../shared/Models/Survey';
import { RespondentserviceService } from '../respondentservice.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { throws } from 'assert';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrl: './fill.component.css',
})

export class FillComponent {
  answer : Answer[] = [];
  fillData: QuestionOption[] = [];
  form: FormGroup; 

  constructor(
    private service: RespondentserviceService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.fillData = [
      {
        questionId: 1,
        questionText: 'What is your name?',
        questionOptionType: 3,
        options: [],
      },
      {
        questionId: 2,
        questionText: 'What is your age?',
        questionOptionType: 1,
        options: [
          {
            optionId: 1, 
            optionText: '18-25',
          },
          {
            optionId: 2,
            optionText: '26-35',
          },
          {
            optionId: 3,
            optionText: '36-45',
          },
          {
            optionId: 4,
            optionText: '46-55',
          },
          {
            optionId: 5,
            optionText: '56-65',
          },
          {
            optionId: 6,
            optionText: '65+',
          }
        ],
      },
      {
        questionId: 3,
        questionText: 'What are your hobbies?',
        questionOptionType: 2,
        options: [
          {
            optionId: 1,
            optionText: 'Reading',
          },
          {
            optionId: 2,
            optionText: 'Writing',
          },
          {
            optionId: 3,
            optionText: 'Singing',
          },
          {
            optionId: 4,
            optionText: 'Dancing',
          },
          {
            optionId: 5,
            optionText: 'Painting',
          },
          {
            optionId: 6,
            optionText: 'Others',
          }
        ],
      }
    ];
    const data = this.service.getData() as Observable<QuestionOption[]>;
    data.subscribe((filldata) => {
      this.fillData = filldata;
      this.CreateForm();
    });
  }

  CreateForm() {
    console.log('hi');
    this.fillData.forEach((question) => {
      if (question.questionOptionType == 1) {
        // For radio button questions
        console.log(question.questionId.toString());
        this.form.addControl(
          question.questionId.toString(),
          this.formBuilder.control(null)
        );
      } else if (question.questionOptionType == 2) {
        // For checkbox button questions
        const optionsGroup = this.formBuilder.group({});
        question.options.forEach((option) => {
          optionsGroup.addControl(
            option.optionId.toString(),
            this.formBuilder.control(false)
          );
        });
        this.form.addControl(question.questionId.toString(), optionsGroup);
      } else if (question.questionOptionType == 3) {
        // For text field questions
        this.form.addControl(
          question.questionId.toString(),
          this.formBuilder.control('')
        );
      }
    });
  }

  addList(list : number) : number[]
  {
    const list2 : number[] = [];
    
    list2.push(list);
    
    return list2;
  }

  addDict(list : any) : number[]
  {
    const list2 : number[] = [];
    Object.keys(list).forEach(key => {
      if(list[key] == true)
      {
        list2.push(Number(key));
      }
    })
    return list2;
  }

  OnSubmit() {
    this.fillData.forEach((question) => {
      const data : Answer = {
        Id : Number(localStorage.getItem('primaryId')),
        QuestionId : Number(question.questionId),
        OptionId : question.questionOptionType == 1 ? this.addList(this.form.get(question.questionId.toString())?.value) : question.questionOptionType == 2 ?  this.addDict(this.form.get(question.questionId.toString())?.value) : [],
        AnswerText : question.questionOptionType == 3 ? String(this.form.get(question.questionId.toString())?.value) :  "" 
      }
      this.answer.push(data);
    });

    this.service.addAnswer(this.answer).subscribe((data) => {
      console.log(data);
    });
  }
}
