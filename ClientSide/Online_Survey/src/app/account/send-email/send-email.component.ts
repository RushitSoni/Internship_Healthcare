import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../shared/Models/user';


@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit{


  emailForm:FormGroup = new FormGroup({})
  submitted=false;
  mode: string | undefined;
  errorMessages:string[]=[];


  constructor(private accountService:AccountService,
   
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute){}


  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next:(user:User|null)=>{
        if(user){
          this.router.navigateByUrl('/')
        }
        else{
          const mode=this.activatedRoute.snapshot.paramMap.get('mode')

          console.log('mode',mode)

          if(mode){
            this.mode=mode
            this.initializeForm()
          }
        }
      }
    })
  }
  initializeForm(){
    this.emailForm = this.formBuilder.group({
      
      email:['',[Validators.required]],//Validators.pattern("")
      
    })
  }

  sendEmail(){
    this.submitted=true
    this.errorMessages=[]

    if(this.emailForm.valid && this.mode){
      if(this.mode.includes('resend-email-confirmation-link')){
        this.accountService.resendEmailConfirmationLink(this.emailForm.get('email')?.value).subscribe({
          next:(response:any)=>{

            console.log(response)
          
            this.router.navigateByUrl('/account/login')
          },
          error: error =>{
  
            console.log(error)
            if(error.error.errors){
              this.errorMessages=error.error.errors
            }
            else{
              this.errorMessages.push(error.error)
            }
    
          }
        })
      }
      else if(this.mode.includes('forgot-username-or-password')){
        this.accountService.forgotUsernameOrPassword(this.emailForm.get('email')?.value).subscribe({
          next:(response : any)=>{
           
            this.router.navigateByUrl('/account/login')
          },
          error: error =>{
  
            console.log(error)
            if(error.error.errors){
              this.errorMessages=error.error.errors
            }
            else{
              this.errorMessages.push(error.error)
            }
    
          }
        })
      }
    }

  }

  cancel(){
    this.router.navigateByUrl('/account/login')
  }
}
