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
/**
 * Represents the FillComponent class.
 * This component is responsible for filling out the survey form.
 */
export class FillComponent {
  fillData: QuestionOption[] = [];
  form: FormGroup;


  constructor(
    private service: RespondentserviceService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    const data = this.service.getData() as Observable<QuestionOption[]>;
    data.subscribe((filldata) => {
      this.fillData = filldata;
      console.log(filldata);
      this.CreateForm();
    });
  }

  CreateForm()
  {
    console.log("hi");
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

  OnSubmit() {
    console.log(this.form.value);
  }

}
