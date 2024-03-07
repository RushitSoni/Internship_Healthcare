import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionQuestionbankComponent } from '../add-question-questionbank/add-question-questionbank.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../../account/account.service';
import { GlobalserviceService } from '../../../globalservice/globalservice.service';
import { QuestionBankQuestion } from '../../shared/Models/questionBankquestion';
import { QuestionBankOptions } from '../../shared/Models/QuestionBankOptions';
import { WorkspaceService } from '../workspace.service';
import { AddSingleOptionComponent } from '../add-single-option/add-single-option.component';
import { EditOptionComponent } from '../edit-option/edit-option.component';
import { EditQuestionComponent } from '../edit-question/edit-question.component';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.css'
})
export class QuestionBankComponent implements OnInit{

  companyId!:number

  questions: QuestionBankQuestion[]=[];
  options: QuestionBankOptions[]=[];
 


  constructor(private globalService:GlobalserviceService, private route : ActivatedRoute,private dialog:MatDialog,private workspaceService:WorkspaceService){}

 

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.companyId = params['companyID'];
    });
    
    
    this.loadQuestions()
    this.loadOptions()

  
    

   
  }

  openAddSingleOption(questionId:number) {
    const dialogRef = this.dialog.open(AddSingleOptionComponent);

    dialogRef.componentInstance.questionId = Number(questionId);
   
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {

        //console.log(result)
        // Handle saved result if needed
        this.loadQuestions()
        this.loadOptions()
    
      }
    });
  }
  openUpdateQuestion(data : QuestionBankQuestion) {
    const dialogRef = this.dialog.open(EditQuestionComponent);

    dialogRef.componentInstance.questionData = data;
   
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {

        //console.log(result)
        // Handle saved result if needed
        this.loadQuestions()
        this.loadOptions()
    
      }
    });
  }

  openUpdateOption(data : QuestionBankOptions) {
    const dialogRef = this.dialog.open(EditOptionComponent);

    dialogRef.componentInstance.optionData = data;
   
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {

        //console.log(result)
        // Handle saved result if needed
        this.loadQuestions()
        this.loadOptions()
    
      }
    });
  }


  openAddQuestionForm() {
    const dialogRef = this.dialog.open(AddQuestionQuestionbankComponent, {
      width: '75%',
      // autoFocus: false // Prevent auto-focusing on first input
    });

    dialogRef.componentInstance.companyId = this.companyId;
    dialogRef.componentInstance.userId = this.globalService.SurveyorId;
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'saved') {

        //console.log(result)
        // Handle saved result if needed
        this.loadQuestions()
        this.loadOptions()
    
      }
    });
  }


  loadQuestions() {
    this.workspaceService.getAllQuestions().subscribe(
      data => {
        console.log('Questions Fetched :',data)
        //console.log(this.globalService.SurveyorId)
        this.questions = data.filter(question =>question.userId === this.globalService.SurveyorId && question.companyId===Number(this.companyId));
        //console.log(this.questions)
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

       // console.log(this.options)

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

  deleteQuestion(id: number){
    const isConfirmed = confirm('Are you sure you want to delete this question?');
    if (!isConfirmed) {
      return; // If user cancels, do nothing
    }
  
    this.workspaceService.deleteQuestion(id).subscribe(
      data => {
        console.log("Question Deleted :",data)

        this.loadQuestions()
        this.loadOptions()
      },
      error => {
        console.error('Error deleting question:', error);
      }
    );
  }
  
  deleteOption(id : number){
    const isConfirmed = confirm('Are you sure you want to delete this option?');
    if (!isConfirmed) {
      return; // If user cancels, do nothing
    }
  
    this.workspaceService.deleteOption(id).subscribe(
      data => {
        console.log("Option Deleted :",data)

        this.loadQuestions()
        this.loadOptions()
      },
      error => {
        console.error('Error deleting option:', error);
      }
    );
  }
  
}
