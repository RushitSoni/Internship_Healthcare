import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup } from '@angular/forms';
import { SurveyTable } from '../Interface/Admin';
import { Service1Service } from '../services/service1.service';
import { GlobalService } from '../globalservice/global.service';

@Component({
  selector: 'app-add-surveyor',
  templateUrl: './add-surveyor.component.html',
  styleUrl: './add-surveyor.component.css'
})
export class AddSurveyorComponent implements OnInit {
  
  list_surveyor! : SurveyTable;
    
  numb : number = 19;
  First_name! : String;
  Middle_name! : String;
  Last_name! : String;
  email! : String;
  password! : String;
  form! : FormGroup;
  constructor(private router: Router,private fb : FormBuilder,private service: Service1Service,private globalService: GlobalService){

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      FirstName : "",
      MiddleName : "",
      LastName : "",
      Email : "",
      Password : "",
    })
  }

  AddSurveyor()
  {
    this.list_surveyor.FirstName = this.form.get('FirstName')?.value;
    this.list_surveyor.MiddleName = this.form.get('MiddleName')?.value;
    this.list_surveyor.LastName = this.form.get('LastName')?.value;
    this.list_surveyor.Email = this.form.get('Email')?.value;
    this.list_surveyor.Password = this.form.get('Password')?.value;

    this.service.addSurveyor(this.list_surveyor).subscribe((data) => {
        this.globalService.SurveyorId = data;
    })
  }

  
}
