import { Component, HostListener } from '@angular/core';
import {
  Answer,
  QuestionOption,
  Respondent_Record,
} from '../../shared/Models/Survey';
import { RespondentserviceService } from '../respondentservice.service';
import { Observable } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RespondentNavigateService } from '../respondent-navigate.service';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrl: './fill.component.css',
})
export class FillComponent {
  answer: Answer[] = [];
  fillData: QuestionOption[] = [];
  form: FormGroup;

  constructor(
    private service: RespondentserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private navigateService: RespondentNavigateService
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.navigateService.setFillRoute('fill');
    const data = this.service.getData() as Observable<QuestionOption[]>;
    data.subscribe((filldata) => {
      this.fillData = filldata;
      this.fillData.forEach((question) => {
        if (question.questionOptionType == 1) {
          // For radio button questions
          console.log(question.questionId.toString());
          this.form.addControl(
            question.questionId.toString(),
            this.formBuilder.control(null, Validators.required)
          );
        } else if (question.questionOptionType == 2) {
          // For checkbox button questions
          const checkboxValidator: ValidatorFn =
            this.atLeastOneCheckboxCheckedValidator();
          const optionsGroup = this.formBuilder.group({});
          question.options.forEach((option) => {
            optionsGroup.addControl(
              option.optionId.toString(),
              this.formBuilder.control(false)
            );
          });
          optionsGroup.setValidators(checkboxValidator);
          this.form.addControl(question.questionId.toString(), optionsGroup);
        } else if (question.questionOptionType == 3) {
          // For text field questions
          this.form.addControl(
            question.questionId.toString(),
            this.formBuilder.control('', Validators.required)
          );
        }
      });
    });
  }

  addList(list: number): number[] {
    const list2: number[] = [];

    list2.push(list);

    return list2;
  }

  addDict(list: any): number[] {
    const list2: number[] = [];
    Object.keys(list).forEach((key) => {
      if (list[key] == true) {
        list2.push(Number(key));
      }
    });
    return list2;
  }

  AddDetails(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.service
        .addRespondent(this.service.getRespondent())
        .subscribe((data) => {
          this.service.respondentid = data;
          resolve(data);
        });
    });
  }

  AddRecord(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const record: Respondent_Record = {
        RespondentId: this.service.respondentid,
        SurveyId: this.service.surveyid,
      };
      this.service.addRecord(record).subscribe((data) => {
        this.service.primaryid = data;
        localStorage.setItem('primaryId', String(data));
        resolve(data);
      });
    });
  }

  OnSubmit() {
    if (this.form.valid) {
      this.AddDetails().then((result) => {
        this.AddRecord().then((result) => {
          this.fillData.forEach((question) => {
            const data: Answer = {
              Id: Number(localStorage.getItem('primaryId')),
              QuestionId: Number(question.questionId),
              OptionId:
                question.questionOptionType == 1
                  ? this.addList(
                      this.form.get(question.questionId.toString())?.value
                    )
                  : question.questionOptionType == 2
                  ? this.addDict(
                      this.form.get(question.questionId.toString())?.value
                    )
                  : [],
              AnswerText:
                question.questionOptionType == 3
                  ? String(this.form.get(question.questionId.toString())?.value)
                  : '',
            };
            this.answer.push(data);
          });

          this.service.addAnswer(this.answer).subscribe((data) => {
            this.router.navigate(['respondent/:surveyid', 'complete'], {
              replaceUrl: true,
            });
          });
        });
      });
    } else {
      this.snackbar.open('Some Fields are Empty!', 'X', {
        duration: 2000,
      });
    }
  }

  private atLeastOneCheckboxCheckedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const checkboxes = Object.values(control.value);
      const isChecked = checkboxes.some((value: any) => value);
      return isChecked ? null : { atLeastOneCheckboxChecked: true };
    };
  }
}
