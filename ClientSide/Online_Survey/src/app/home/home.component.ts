import { Component, OnInit } from '@angular/core';
import { GlobalserviceService } from '../../globalservice/globalservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userLoggedId : string|undefined
  constructor(private globalService: GlobalserviceService) { }


  ngOnInit(): void {
    this.userLoggedId=this.globalService.SurveyorId
    
  }

  
}
