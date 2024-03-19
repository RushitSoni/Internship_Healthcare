import { Component, OnInit } from '@angular/core';
import { ResponseViaSurveyId } from '../../shared/Models/ResponseViaSurveyId';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent  implements OnInit{


  data!:ResponseViaSurveyId

  ngOnInit(): void {
   
  }

}
