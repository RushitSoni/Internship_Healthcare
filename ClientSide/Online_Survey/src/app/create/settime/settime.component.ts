import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SurveyTable } from '../../shared/Models/Survey';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settime',
  templateUrl: './settime.component.html',
  styleUrl: './settime.component.css'
})
export class SettimeComponent implements OnInit{
  
  
  @Output() surveytable : EventEmitter<any> = new EventEmitter();

  mindate: String;
  departmentId!:number;
  formData! : FormGroup;
  
  constructor(public dialogRef : MatDialogRef<SettimeComponent>,private globalservice : GlobalserviceService,private formBuilder : FormBuilder)
  {
    this.mindate = this.formatDate(new Date());
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      surveyname : ["",Validators.required],
      description : ["",Validators.required],
      selectedStartDate : ['',Validators.required],
      selectedEndDate : ['',Validators.required],
      selectedTime: ['',Validators.required],
      selectedEndTime : ['',Validators.required],
      count : [0,Validators.required]
    });
  }

  formatDate(date : Date) : String {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  SaveChanges() : Promise<SurveyTable>
  {
    return new Promise<SurveyTable>((resolve,reject)=>{
      if(this.formData.valid)
      {
        const surveyTable : SurveyTable = {
          surveyId:0,
          surveyorId : this.globalservice.SurveyorId!,
          SurveyName : this.formData.get('surveyname')?.value,
          Description : this.formData.get('description')?.value,
          dateCreated:'',
          StartDate : String(this.formData.get('selectedStartDate')!.value),
          EndDate : String(this.formData.get('selectedEndDate')!.value),
          startTime : String(this.formData.get('selectedTime')!.value),
          endTime : String(this.formData.get('selectedEndTime')!.value),
          deptId : this.departmentId,
          Count : this.formData.get('count')?.value
        }
        console.log(surveyTable);
        resolve(surveyTable);
      }
      else
      {
        console.log("Error");
        reject();
      }
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

  Dialogclose(){
    this.dialogRef.close();
  }
}
