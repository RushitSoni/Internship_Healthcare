import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import { User } from '../../shared/Models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup = new FormGroup({});
  submitted = false;

  errorMessage: string[] = [];
  returnUrl:string | null=null

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
   
    @Inject(DOCUMENT) private _document:Document
  ) {

    this.accountService.user$.pipe(take(1)).subscribe({
      next:(user:User | null)=>{
        if(user){
          this.router.navigateByUrl('/')
        }
        else{
            this.activatedRoute.queryParamMap.subscribe({
              next:(params : any)=>{
                if(params){
                  this.returnUrl = params.get('returnUrl')
                }
              }
            })
        }
      }
    })
  }
  ngOnInit(): void {
    this.initializeForm()
  }
 

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
         
        ],
      ],
     
      password: [
        '',
        [
          Validators.required,
         
        ],
      ],
    });
  }

  login(){
    this.submitted=true
    this.errorMessage=[]

    if(this.loginForm.valid){


      this.accountService.login(this.loginForm.value).subscribe({
        next:(response:any)=>{
          
          console.log("login",response)

          if(this.returnUrl){
            this.router.navigateByUrl(this.returnUrl)
          }
          else{
            this.router.navigateByUrl('/')
          
          }
          
        },
        error: error =>{
  
          console.log(error)
          if(error.error.errors){
            this.errorMessage=error.error.errors
          }
          else{
            this.errorMessage.push(error.error)
          }
  
        }
        
      })

      
  
      //console.log(this.registerForm.value)

    }



  }

  resendEmailConfirmationLink(){
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link')
  }

  
}
