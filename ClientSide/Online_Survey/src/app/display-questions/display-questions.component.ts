import { Component, Inject, OnInit, SkipSelf } from '@angular/core';
import { APP_SERVICE } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { Service1Service } from '../services/service1.service';
import { HttpClient } from '@angular/common/http';
import { Admin, SurveyTable } from '../Interface/Admin';

@Component({
  selector: 'app-display-questions',
  templateUrl: './display-questions.component.html',
  styleUrl: './display-questions.component.css'

})

export class DisplayQuestionsComponent implements OnInit {
    list_admin : Admin[] = [];

    list_surveyor : SurveyTable = 
      {
        FirstName: "Meet",
        MiddleName: "Amit",
        LastName: "Gandhi",
        Email: "amit2375@gmail.com",
        Password: "Parrot@2002"
      };
    
    numb : number = 19; 
    surveyid! : number;
    
    constructor(@SkipSelf() private service:Service1Service) {
      
    }

    ngOnInit(): void {
      this.service.getAdmin().subscribe( admin => {
        this.list_admin = admin;
      })  
    }

    // Adding the Surveyor and getting the Surveyor Id.
    Login()
    {
      
    }

    
}
