import { Component, OnInit} from '@angular/core';

import { Color, LegendPosition,  ScaleType } from '@swimlane/ngx-charts';
import { WorkspaceService } from '../workspace.service';
import { QuestionDTO, ResponseViaSurveyId } from '../../shared/Models/ResponseViaSurveyId';
import { Question } from '../../shared/Models/Survey';


@Component({
  selector: 'app-response-visulization',
  templateUrl: './response-visulization.component.html',
  styleUrl: './response-visulization.component.css'
})
export class ResponseVisulizationComponent implements OnInit{

  selectedBlock: number =1;
  surveyId!:number
  response!:ResponseViaSurveyId[]

  questions:QuestionDTO[]=[]
  pieChartData: { questionText: string, type: string, options: { [key: string]: number } }[] = [];
  data:any=[]
  newData:{ questionText: string, questionType: string, options: { name: string, value: number }[] }[] = [];

  single: any[]=[ {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }];
  view:  [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'Cool', 
    selectable: true,
    group: ScaleType.Ordinal 
  };
  
  constructor(
    private workspaceService:WorkspaceService
  ) {
    
  }


  ngOnInit(): void {
    this.getResponseData()

  
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  /////// Normal Part  (Above Part is for chart)

  showContent(blockNumber: number): void {
    this.selectedBlock = blockNumber;
  }


  getResponseData(): void {
    this.workspaceService.getResponseBySurveyId(this.surveyId)
      .subscribe(
        (response: any) => {
          this.response = response.result;
          console.log("Responses Fetched !!", this.response);
  
          // Initialize questionData
          const questionData: { [questionText: string]: { type: string, options?: { [optionText: string]: number } } } = {};
  
          // Process response data
          if (this.response && this.response.length > 0) {
            this.response.forEach(responseItem => {
              if (responseItem.questionList && responseItem.questionList.length > 0) {
                responseItem.questionList.forEach(question => {
                  if (!questionData[question.questionText]) {
                    questionData[question.questionText] = { type: question.questionType, options: {} };
                  }
  
                  if (question.options && question.options.length > 0) {
                    question.answerTexts.forEach((answer: string) => {
                      if (!questionData[question.questionText].options![answer]) {
                        questionData[question.questionText].options![answer] = 1;
                      } else {
                        questionData[question.questionText].options![answer]++;
                      }
                    });
                  } else if (question.questionType === "3") {
                    question.answerTexts.forEach((answer: string) => {
                      if (!questionData[question.questionText].options![answer]) {
                        questionData[question.questionText].options![answer] = 1;
                      } else {
                        questionData[question.questionText].options![answer]++;
                      }
                    });
                  }
                });
              }
            });
          }
  
          // Output the question data
          console.log(questionData);
          this.data=questionData

        

          // Object.keys(data).forEach(question => {
          //   if (data[question].type === "1" || data[question].type === "2") {
          //     const options = Object.keys(data[question].options).map(option => {
          //       return { name: option, value: data[question].options[option] };
          //     });
          //     this.pieChartData.push({ question, options });
      
          //   }
          // });
      
          // console.log("pie",this.pieChartData)

          this.pieChartData = Object.keys(this.data).map(questionKey => ({
            questionText: questionKey,
            type: this.data[questionKey].type,
            options: this.data[questionKey].options
          }));


 


        console.log(this.pieChartData)


        // Create a new array to store the transformed data
const newDataArray: { questionText: string, questionType: string, options: { name: string, value: number }[] }[] = [];

// Iterate over each item in the pieChartData array
this.pieChartData.forEach((item) => {
    // Convert options into the desired format and push into the new array
    const newOptions = Object.keys(item.options).map(key => ({
        name: key,
        value: item.options[key]
    }));
    newDataArray.push({ questionText: item.questionText, questionType: item.type, options: newOptions });
});

// Now, newDataArray contains the transformed data with questionType
console.log(newDataArray);
this.newData=newDataArray


  
        },
        (error: any) => {
          console.error("Error when fetching responses:", error.message);
        }
      );
  }

 
  
  

}
