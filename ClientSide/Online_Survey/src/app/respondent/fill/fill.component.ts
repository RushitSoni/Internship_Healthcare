import { Component } from '@angular/core';

@Component({
  selector: 'app-fill',
  templateUrl: './fill.component.html',
  styleUrl: './fill.component.css'
})
/**
 * Represents the FillComponent class.
 * This component is responsible for filling out the survey form.
 */
export class FillComponent {
  fillData: any[] = []; 
  constructor() { }

  /**
   * Initializes the component.
   * Adds dummy data to the fillData array for testing purposes.
   */
  ngOnInit() {
    this.fillData = [
      // Dummy data for testing purposes
      {
        "QuestionId": 1,
        "QuestionText": "Name",
        "QuestionOptionType": 1, // 1 for text field
        "Options": []
      },
      {
        "QuestionId": 2,
        "QuestionText": "Gender",
        "QuestionOptionType": 2, // 2 for radio button
        "Options": [
          {
            "OptionId": "a",
            "OptionText": "Male"
          },
          {
            "OptionId": "b",
            "OptionText": "Female"
          },
          {
            "OptionId": "c",
            "OptionText": "Rather Not says"
          },
        ]
      },
      {
        "QuestionId": 3,
        "QuestionText": "What did you like about the product?",
        "QuestionOptionType": 3, // 3 for checkbox
        "Options": [
          {
            "OptionId": "a",
            "OptionText": "Quality"
          },
          {
            "OptionId": "b",
            "OptionText": "Price"
          },
          {
            "OptionId": "c",
            "OptionText": "Service"
          },
        ]
      },
      {
        "QuestionId": 4,
        "QuestionText": "What did you dislike about the product?",
        "QuestionOptionType": 3,
        "Options": [
          {
            "OptionId": "a",
            "OptionText": "Quality"
          },
          {
            "OptionId": "b",
            "OptionText": "Price"
          },
          {
            "OptionId": "c",
            "OptionText": "Service"
          },
        ]
      },
      {
        "QuestionId": 5,
        "QuestionText": "Enter your age",
        "QuestionOptionType": 1,
        "Options": []
      },
      {
        "QuestionId": 6,
        "QuestionText": "Live in rural area or city?",
        "QuestionOptionType": 2,
        "Options": [
          {
            "OptionId": "a",
            "OptionText": "Rural"
          },
          {
            "OptionId": "b",
            "OptionText": "City"
          },
        ]
      },
    ]
  }
}
