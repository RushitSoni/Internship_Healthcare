import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrl: './takesurvey.component.css'
})
export class TakesurveyComponent {
  surveyid! : number;

  constructor(private route: ActivatedRoute)
  {

  }

  TakeSurvey()
  {
    this.route.params.subscribe(params => {
      this.surveyid = params['surveyid'] as number;
    });

    console.log(this.surveyid);
  }

}
