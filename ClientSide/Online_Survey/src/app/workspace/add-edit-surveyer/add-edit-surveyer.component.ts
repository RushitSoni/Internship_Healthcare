import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SurveyerViaDept } from '../../shared/Models/surveyerViaDept';
import { User } from '../../shared/Models/user';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { WorkspaceService } from '../workspace.service';
import { APIResponse } from '../../shared/Models/APIResponse';

@Component({
  selector: 'app-add-edit-surveyer',
  templateUrl: './add-edit-surveyer.component.html',
  styleUrl: './add-edit-surveyer.component.css'
})
export class AddEditSurveyerComponent  implements OnInit{

  companyId: number=0
  departmentId: number=0

  isAdmin=false

  users: User[] =[];

  surveyerDepts :SurveyerViaDept[]=[]

  surveyerDeptForm: FormGroup=new FormGroup({}); // Remove initialization here
  submitted = false;

  user: any ; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;


  constructor(private dialogRef: MatDialogRef<AddEditSurveyerComponent>,
    private route: ActivatedRoute, 
    private workspaceService: WorkspaceService,
    private formBuilder: FormBuilder,
    private accountService:AccountService,
    private dialog:MatDialog,
    @Inject (MAT_DIALOG_DATA) public data:SurveyerViaDept,
 ) {} // Inject FormBuilder here

  ngOnInit(): void {
    
    this.userSubscription = this.accountService.user$.subscribe(
      user => {
        this.user = user; 
        // Assign user data to the local variable
       
      }
    );
   

    this.initializeForm()
   
  }
  initializeForm() {

    if(this.data){
      this.surveyerDeptForm = this.formBuilder.group({

        surveyerDeptId:this.data.surveyerDeptId,
        deptId: this.data.deptId,
        userId: this.data.userId,
        userName: [this.data.userName, Validators.required],
        companyId: this.data.companyId,
      });
    }
    else{
      this.surveyerDeptForm = this.formBuilder.group({
      
        deptId: this.departmentId,
        userId: '',
        userName: ['', Validators.required],
        companyId: this.companyId,
      });

    }
   
  }

 




   
  
 
  createSurveyerDept(): void {
    this.submitted = true;

    console.log(this.surveyerDeptForm.value)
    console.log(this.users)
    const selectedUser = this.users.find(user => user.email == this.surveyerDeptForm.value.userName);
    // console.log(selectedUser)
    if (selectedUser) {
        console.log(selectedUser.id)
        this.surveyerDeptForm.patchValue({
            userId: selectedUser.id

        });

       if(this.data){
         //update

      this.workspaceService.updateSurveyerDept(this.surveyerDeptForm.value,this.data.surveyerDeptId)
      .subscribe((response: APIResponse) => {
        if (response.responseCode === 200) {
          console.log('DSurveyer Updated successfully. ID:', response.result);
          
          
          this.dialogRef.close('saved');
          
        } else {
          console.error('Error updating surveyer:', response.errorMsg);
          
        }
      });

       }
       else{
        this.workspaceService.createSurveyerDept(this.surveyerDeptForm.value)
        .subscribe((response: APIResponse) => {
          if (response.responseCode === 201) {
            console.log('Surveyer created successfully. ID:', response.result);
           
            this.dialogRef.close('saved');
            
          } else {
            console.error('Error creating surveyer:', response.errorMsg);
          }
        });
       }
  } else {
    console.error('User Not Found...!');
    // Handle error, maybe show an error message to the user
}
}
}
