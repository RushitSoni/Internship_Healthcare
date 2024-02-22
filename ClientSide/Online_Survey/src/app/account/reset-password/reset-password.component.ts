import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { ResetPassword } from '../../shared/Models/resetPassword';
import { User } from '../../shared/Models/user';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{


  token: string| undefined
  email: string | undefined
  submitted=false
  errorMessages:string[]=[]

  resetPasswordForm : FormGroup = new FormGroup({})


  constructor(private accountService:AccountService,
   
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next:(user: User | null)=>{
        if(user){
          this.router.navigateByUrl('/')
        }
        else{
          this.activatedRoute.queryParamMap.subscribe({
            next:(params: any)=>{
                this.token =params.get('token')
                this.email = params.get('email')

                if(this.token && this.email){
                  this.initializeForm(this.email)
                }

                else{
                  this.router.navigateByUrl('/account/login')
                }
            }
          })
        }
      }
    })
  }

  initializeForm(username:string){
    this.resetPasswordForm = this.formBuilder.group({
      
      email:[{value:username,disabled:true}],
      newPassword: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(15)],
      ],
      
    })
  }

  resetPassword(){

    this.submitted= true
    this.errorMessages=[]

    if(this.resetPasswordForm.valid && this.email && this.token){
      const model : ResetPassword = {

        token: this.token,
        email:this.email,
        newPassword:this.resetPasswordForm.get('newPassword')?.value
        
      }


      this.accountService.resetPassword(model).subscribe({
        next :(response : any)=>{
           
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
