import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SurveyTable } from '../../shared/Models/Survey';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';

@Component({
  selector: 'app-settime',
  templateUrl: './settime.component.html',
  styleUrl: './settime.component.css'
})
export class SettimeComponent {
  
  
  @Output() surveytable : EventEmitter<any> = new EventEmitter();

  selectedStartDate! : string;
  selectedEndDate! : string;
  mindate: String;
  selectedTime!: string;
  selectedDuration! : number;
  description! : string;
  departmentId!:number
  
  constructor(public dialogRef : MatDialogRef<SettimeComponent>,private globalservice : GlobalserviceService)
  {
    this.mindate = this.formatDate(new Date());
  }

  formatDate(date : Date) : String {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  SaveChanges() : Promise<SurveyTable>
  {
    console.log(this.description);
    return new Promise<SurveyTable>((resolve,reject)=>{
      const surveyTable : SurveyTable = {
        SurveyorId : this.globalservice.SurveyorId!,
        Description : this.description,
        StartDate : this.selectedStartDate,
        EndDate : this.selectedEndDate,
        DepartmentId : this.departmentId
      }
      resolve(surveyTable);
    });
  }

  close() : void{
    this.SaveChanges().then((surveyTable) => {
      console.log(surveyTable);
      this.dialogRef.close(surveyTable);
    }).catch((error) => {
      console.log("Got An Error");
    })
  } 
}
