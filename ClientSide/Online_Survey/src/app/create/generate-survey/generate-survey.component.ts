import { Component, OnInit } from '@angular/core';
import { CreateService } from '../create.service';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SettimeComponent } from '../settime/settime.component';
import { SurveyTable } from '../../shared/Models/Survey';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigateserviceService } from '../navigateservice.service';

@Component({
  selector: 'app-generate-survey',
  templateUrl: './generate-survey.component.html',
  styleUrl: './generate-survey.component.css',
})
export class GenerateSurveyComponent implements OnInit {
  settime = true;
  selectedStartDate!: Date;
  selectedEndDate!: Date;
  mindate: String;
  selectedTime: any;
  selectedDuration!: number;
  description: string = '';
  departmentId: string = '';
  companyId: string = '';
  from_template : boolean = false;
  templateId! : number;
  surveyList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: CreateService,
    private globalService: GlobalserviceService,
    private router: Router,
    private snackbar : MatSnackBar,
    private navigateService : NavigateserviceService,
  ) {
    this.mindate = this.formatDate(new Date());
  }

  ngOnInit(): void {
    this.navigateService.setSourcePage('generate');
    this.route.queryParams.subscribe((params) => {
      this.departmentId = params['deptID'];
      this.companyId = params['companyID'];
    });

    this.check();

    // localStorage.setItem('departmentId', this.departmentId);
  }

  templateSurvey(template_id : number)
  {
    this.from_template = !this.from_template;
    this.templateId = template_id;
    this.openDialog();
  }

  formatDate(date: Date): String {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  }

  check() 
  {
    this.surveyList = [];
    this.service.getAllSurveys().subscribe((data) => {
      data.forEach(element => {
        if(element.surveyorId == this.globalService.SurveyorId)
        {
          this.surveyList.push(element.surveyName);
        }
      });
      console.log(this.surveyList);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SettimeComponent, {
        width: '50%',
        disableClose: true
    });
    
    dialogRef.componentInstance.departmentId=Number(this.departmentId)
    dialogRef.componentInstance.surveyList = this.surveyList;
    

    dialogRef.afterClosed().subscribe((result) => {
      if(result != null)
      {
        this.CreateSurvey(result);
      }
    });
  }

  CreateSurvey(surveyTable: SurveyTable) {
    this.service.createSurvey(surveyTable).subscribe((data) => {
      this.globalService.SurveyId = data;
      localStorage.setItem('surveyId', String(data));
    });
    this.settime = !this.settime;

    //queryParams

    const queryParams: NavigationExtras = {
      queryParams: {
        deptID: this.departmentId,
        companyID: this.companyId,
        fromTemplate: this.from_template,
        templateId : this.templateId
      },
    };

    this.snackbar.open("Description Added!",'Close',{
      duration : 2000
    });
    this.router.navigate(['/create/generate', 'addquestion'], queryParams);
  }
}
