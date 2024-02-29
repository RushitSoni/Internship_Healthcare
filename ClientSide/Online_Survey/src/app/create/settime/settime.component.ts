import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SurveyTable } from '../../shared/Models/Survey';

@Component({
  selector: 'app-settime',
  templateUrl: './settime.component.html',
  styleUrl: './settime.component.css'
})
export class SettimeComponent {
  
  @Output() surveytable : EventEmitter<any> = new EventEmitter();

  selectedStartDate! : Date;
  selectedEndDate! : Date;
  mindate: String;
  selectedTime: any;
  selectedDuration! : number;
  description! : string;
  
  constructor(public dialogRef : MatDialogRef<SettimeComponent>)
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
        SurveyorId : 'ccc5dff2-a4c6-4c9c-882a-130bab6a2d26',
        Description : this.description
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
