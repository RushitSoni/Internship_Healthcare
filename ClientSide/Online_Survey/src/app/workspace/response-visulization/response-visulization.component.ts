import { Component, OnInit, ViewChild} from '@angular/core';

import { Color, LegendPosition,  ScaleType } from '@swimlane/ngx-charts';
import { WorkspaceService } from '../workspace.service';
import { QuestionDTO, ResponseViaSurveyId } from '../../shared/Models/ResponseViaSurveyId';
import { Question } from '../../shared/Models/Survey';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseComponent } from '../response/response.component';
import { error } from 'console';

import * as XLSX from 'xlsx';
import { FileSaverService } from 'ngx-filesaver';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';



@Component({
  selector: 'app-response-visulization',
  templateUrl: './response-visulization.component.html',
  styleUrl: './response-visulization.component.css'
})
export class ResponseVisulizationComponent implements OnInit{

  selectedBlock: number =1;
  surveyId!:number
  surveyName!:string
  response!:ResponseViaSurveyId[]


  questions:QuestionDTO[]=[]
  pieChartData: { questionText: string, type: string, options: { [key: string]: number } }[] = [];
  data:any=[]
  newData:{ questionText: string, questionType: string, options: { name: string, value: number }[] }[] = [];



  displayedColumns: string[] = ['respondent','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  surveyStatus!:number
  url!:string



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
  legendPosition: LegendPosition = LegendPosition.Right;

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'Cool', 
    selectable: true,
    group: ScaleType.Ordinal 
  };

  questionCountMap: { [key: string]: number } = {}
  graphQuestionCount!:{ name: string; value: number; }[]


  constructor(
    private workspaceService:WorkspaceService,
    private globalService:GlobalserviceService,
    private dialog:MatDialog,
    private fileSaver:FileSaverService,
    public dialogRef: MatDialogRef<ResponseVisulizationComponent>
  ) {
    
  }
 

  ngOnInit(): void {
    this.getResponseData()
    this.checkSurveyStatus(this.surveyId)

    this.url = this.globalService.FrontendUrl + '/respondent/' + this.surveyId;

  
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

  questionTypeMap: { [key: string]: string } = {
    '1': 'MCQ',
    '2': 'MSQ',
    '3': 'Text',
    'Total':'Total'
  };

  calculateQuestionCounts(): void {

    this.questionCountMap['Total'] = 0;
    this.response[0].questionList.forEach(question => {
        if (this.questionCountMap[question.questionType]) {
          this.questionCountMap[question.questionType]++;
          this.questionCountMap['Total']++
        } else {
          this.questionCountMap[question.questionType] = 1;
          this.questionCountMap['Total']++
        }
      });

   this.graphQuestionCount = Object.keys(this.questionCountMap)
  .filter(key => key !== 'Total') // Exclude 'Total' key
  .map(key => ({ name: this.getQuestionTypeName(key), value: this.questionCountMap[key] }));

    
  }

  // Method to get question type name
  getQuestionTypeName(questionType: string): string {
    return this.questionTypeMap[questionType];
  }


  getResponseData(): void {
    this.workspaceService.getResponseBySurveyId(this.surveyId)
      .subscribe(
        (response: any) => {
          this.response = response.result;
          console.log("Responses Fetched !!", this.response);

          this.calculateQuestionCounts()

          this.dataSource = new MatTableDataSource(this.response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
  
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

 
  applyFilter(event:Event) {
    const filterValue=(event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  viewResponse(response:ResponseViaSurveyId){
    const dialogRef = this.dialog.open(ResponseComponent, {
     width:'60%',
      height:'60%'
      // autoFocus: false // Prevent auto-focusing on first input
    });
  
   
    dialogRef.componentInstance.data = response;
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {
  
      }
    });
  }


  checkSurveyStatus(surveyId: number): void{
    this.workspaceService.checkDate(surveyId).subscribe((response)=>{
      console.log("Survey Status :", response)
      this.surveyStatus=response
    },
    error=>{
      console.error("Error fetching survey status...")
    })
  }

  excelExport(){

    interface DemoDataItem {
      [key: string]: any;
    }
    
    const demoData: DemoDataItem[] = [];
    

   this.response.forEach(responseItem => {
    
     const respondentData: { [key: string]: any } = { respondentId: responseItem.respondentId };
   
     // Iterate over the question list for each response
     responseItem.questionList.forEach(question => {
      
       const key = `${question.questionText} [${this.questionTypeMap[question.questionType]}]`;
       respondentData[key] = question.answerTexts.join(', ');
     });
   
     
     demoData.push(respondentData);
   });
   
   



    console.log(demoData);

   
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';


    const worksheet= XLSX.utils.json_to_sheet(demoData)

    const workbook = {
      Sheets :{
        'ResponseSheet': worksheet
      },
     
        SheetNames:[ 'ResponseSheet']
     
    }

    const excelBuffer = XLSX.write(workbook,{bookType:'xlsx',type:'array'})


    //

    const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE})
    this.fileSaver.save(blobData,`${this.surveyName}_Responses`)
  }


  close(){
    this.dialogRef.close('saved');
  }
}
