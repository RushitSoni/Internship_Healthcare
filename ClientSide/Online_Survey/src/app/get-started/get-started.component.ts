
import { Component } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent {

  createSurvey() {
    // Add logic to handle "Create Survey" button click
   alert('Create Survey clicked');
  }

  learnMore() {
    // Add logic to handle "Learn More" button click
    alert('Learn More clicked');
  }

}
