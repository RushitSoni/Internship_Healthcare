import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Respondent, Respondent_Record } from '../../shared/Models/Survey';
import { RespondentserviceService } from '../respondentservice.service';

@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrl: './takesurvey.component.css'
})
export class TakesurveyComponent implements OnInit {
  
  surveyid! : number;
  firstname! : string;
  middlename! : string;
  lastname! : string;
  email! : string;
  phonenumber! : string;
  respondentid! : number;
  availablitiy! : number;

  constructor(private route: ActivatedRoute,private router: Router,private service : RespondentserviceService)
  {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.service.surveyid = params['surveyid'] as number;
    });

    this.service.checkDate(this.service.surveyid).subscribe((data) => {
      console.log(data);
      this.availablitiy = data;
      // 1 -> Yet to start.
      // 2 -> Finished.
      // 0 -> Active.
    })
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
        this.service.respondentid = data;
        resolve(data);
      });
    });
  }

  AddRecord() : Promise<number>
  {
    return new Promise<number>((resolve,reject) => {
      this.route.params.subscribe(params => {
        this.service.surveyid = params['surveyid'] as number;
      });
      const record : Respondent_Record = {
        RespondentId : this.service.respondentid,
        SurveyId : this.service.surveyid 
      }

      this.service.addRecord(record).subscribe((data) => {
        this.service.primaryid = data;
        localStorage.setItem('primaryId',String(data));
        resolve(data);
      })
    });
  }

  TakeSurvey()
  {
    this.AddDetails().then((result) => {
      this.AddRecord().then((result) => {
        this.router.navigate(['respondent/:surveyid','fill']);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

}
