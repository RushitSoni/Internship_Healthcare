import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Respondent } from '../../shared/Models/Survey';
import { RespondentserviceService } from '../respondentservice.service';

@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrl: './takesurvey.component.css'
})
export class TakesurveyComponent {
  
  surveyid! : number;
  firstname! : string;
  middlename! : string;
  lastname! : string;
  email! : string;
  phonenumber! : string;
  

  constructor(private route: ActivatedRoute,private router: Router,private service : RespondentserviceService)
  {

  }

  AddDetails() : Promise<number>
  {
    return new Promise<number>((resolve,reject) => {
      const respondent : Respondent = {
        Name : this.firstname + '' + this.middlename + '' + this.lastname,
        Email : this.email,
        PhoneNumber: this.phonenumber
      };

      console.log(respondent);
      this.service.addRespondent(respondent).subscribe((data) => {
        console.log(data);
        
      });
    });
  }

  TakeSurvey()
  {
    this.AddDetails().then((result) => {
      this.route.params.subscribe(params => {
        this.surveyid = params['surveyid'] as number;
      });
  
      this.router.navigate(['respondent/:surveyid','fill']);
      console.log(this.surveyid);
    }).catch((err) => {
      
    });
  }

}
