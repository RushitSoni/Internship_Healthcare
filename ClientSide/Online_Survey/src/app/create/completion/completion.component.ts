import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, input } from '@angular/core';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { QuestionOption } from '../../shared/Models/Survey';
import { CreateService } from '../create.service';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrl: './completion.component.css'
})
export class CompletionComponent implements OnInit {
  
  Frontendurl! : string;
  inputUrl : string = '';
  

  constructor( private globalservice : GlobalserviceService , private service : CreateService) {}
  
  ngOnInit(): void {
    this.Frontendurl = this.globalservice.FrontendUrl + 'respondent/' + this.globalservice.SurveyId;
    this.inputUrl = this.Frontendurl;
  }

  SaveTemplate()
  {
     
  }
}
