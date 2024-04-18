import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Respondent, Respondent_Record } from '../../shared/Models/Survey';
import { RespondentserviceService } from '../respondentservice.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionComponent } from '../description/description.component';
import { RespondentNavigateService } from '../respondent-navigate.service';

@Component({
  selector: 'app-takesurvey',
  templateUrl: './takesurvey.component.html',
  styleUrl: './takesurvey.component.css',
})
export class TakesurveyComponent implements OnInit {
  surveyid!: number;
  firstname!: string;
  middlename!: string;
  lastname!: string;
  email!: string;
  phonenumber!: string;
  respondentid!: number;
  availablitiy!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RespondentserviceService,
    private snackbar: MatSnackBar,
    private matDialog : MatDialog,
    private navigateService : RespondentNavigateService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.service.surveyid = params['surveyid'] as number;
    });


    this.service.checkDate(this.service.surveyid).subscribe((data) => {
      console.log(data);
      this.availablitiy = data;
      // 1 -> Yet to start.
      // 2 -> Finished.
      // 0 -> Active.
    });
  }

  CheckDetails(respondent: Respondent): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.route.params.subscribe((params) => {
        this.service.surveyid = params['surveyid'] as number;
      });

      const data = this.service.checkSurveyAvailability(
        respondent,
        this.service.surveyid
      ) as Observable<Boolean>;

      data.subscribe((data) => {
        console.log(data);
        if (data == true) {
          this.router.navigate(['respondent/:surveyid', 'filled'],{replaceUrl: true});
          reject();
        } else {
          resolve();
        }
      });
    });
  }

  AddDetails(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const respondent: Respondent = {
        id: 0,
        Email: this.email,
      };

      if (respondent.Email != undefined && this.CheckEmail(respondent.Email)) {
        this.CheckDetails(respondent)
          .then((result) => {
            this.service.setRespondent(respondent);
            // this.service.addRespondent(respondent).subscribe((data) => {
            //   this.service.respondentid = data;
            //   resolve(data);
            // });
            resolve();
          })
          .catch((err) => {});
      } else {
        this.snackbar.open('Please Enter proper Email!', 'X', {
          duration: 2000,
        });
        reject();
      }
    });
  }

  AddRecord(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // const record: Respondent_Record = {
      //   RespondentId: this.service.respondentid,
      //   SurveyId: this.service.surveyid,
      // };
      // this.service.addRecord(record).subscribe((data) => {
      //   this.service.primaryid = data;
      //   localStorage.setItem('primaryId', String(data));
      //   resolve(data);
      // });
      resolve();
    });
  }

  TakeSurvey() {
    this.AddDetails()
      .then((result) => {
        this.AddRecord().then((result) => {
          const dialogRef = this.matDialog.open(DescriptionComponent,{
            width: '50%',
            height: '50%',
            disableClose: true
          });

          dialogRef.afterClosed().subscribe((result) => {
            this.navigateService.setLogin();
            this.router.navigate(['respondent/:surveyid','fill'],{replaceUrl : true, queryParams: { email: this.email }});
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  CheckEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
