import { Component, OnInit } from '@angular/core';
import { Template } from '../../shared/Models/Respondent';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { CreateService } from '../create.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-template-display',
  templateUrl: './template-display.component.html',
  styleUrl: './template-display.component.css'
})
export class TemplateDisplayComponent implements OnInit {
  
  template : Observable<Template[]> = new Observable<Template[]>;

  constructor(private globalservice : GlobalserviceService,private service : CreateService)
  {
  }

  async ngOnInit(): Promise<void> {
    this.template = this.service.getTemplate();
    console.log(this.template);
    this.template.subscribe(data => {
      console.log(data);
    });
  }    
}
