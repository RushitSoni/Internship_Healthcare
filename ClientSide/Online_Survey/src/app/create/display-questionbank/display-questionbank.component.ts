import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WorkspaceService } from '../../workspace/workspace.service';
import { QuestionBankOptions } from '../../shared/Models/QuestionBankOptions';
import { QuestionBankQuestion } from '../../shared/Models/questionBankquestion';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display-questionbank',
  templateUrl: './display-questionbank.component.html',
  styleUrl: './display-questionbank.component.css'
})
export class DisplayQuestionbankComponent implements OnInit{

  @Output() questionDataEmitter: EventEmitter<any> = new EventEmitter<any>();

  companyId!:number

  questions: QuestionBankQuestion[]=[];
  options: QuestionBankOptions[]=[];
  
  constructor(private workspaceService:WorkspaceService,
    private globalService:GlobalserviceService,
    public snackBar: MatSnackBar){}


  ngOnInit(): void {

    this.loadQuestions()
    this.loadOptions()
   
  }

  loadQuestions() {
    this.workspaceService.getAllQuestions().subscribe(
      data => {
        console.log('Questions Fetched :',data)
        // console.log(this.globalService.SurveyorId)
        // console.log(this.companyId)
        //this.questions=data
        //this.questions = data.filter(question =>question.userId === this.globalService.SurveyorId && question.companyId===Number(this.companyId));
        //console.log(this.questions)

        if(this.companyId){
          this.questions = data.filter(question =>question.companyId===Number(this.companyId));
        }
        else{
          this.questions = data.filter(question =>question.userId === this.globalService.SurveyorId );
        }
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  loadOptions() {
    this.workspaceService.getAllOptions().subscribe(
      data => {
        console.log("Options Fetched :",data)
        this.options = data;

        //console.log(this.options)

       // console.log(this.filterOptionsByQuestion(22))
      },
      error => {
        console.error('Error fetching options:', error);
      }
    );
  }

  filterOptionsByQuestion(questionId : number) {
    
      const filteredOptions = this.options.filter(option => option.questionId === questionId);
      return filteredOptions
  }


  addQuestionFromQuestionBank(question:QuestionBankQuestion,options:QuestionBankOptions[]) {
    const questionData = {
      question: question,
      options:options
    };
    // console.log(questionData);

    this.questionDataEmitter.emit(questionData);

    // this.snackBar.open('Question Added Successfully!', 'Close', {
    //   duration: 3000,
    //   panelClass:"custom-snackbar"
    // });

  // const config = new MatSnackBarConfig();
  // config.duration = 3000;
  // config.panelClass = ['custom-snackbar']; // Class name to be used in CSS

  // this.snackBar.open('Question Added Successfully!', 'Close', config);



  this.snackBar.open("Question Added Successfully!!", "X", {
    duration: 3000,
    panelClass:'custom-snackbar'
    
    });
  }
  

}
