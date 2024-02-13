import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AccountService } from '../account.service';
import { User } from '../../shared/Models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {




  registerForm : FormGroup =new FormGroup({})
  submitted=false
  errorMessage:string[]=[]



  constructor(private accountService : AccountService,private formBuilder : FormBuilder, private router : Router,private renderer2:Renderer2,
    @Inject(DOCUMENT) private _document:Document){

        this.accountService.user$.pipe(take(1)).subscribe({
          next:(user : User | null)=>{

            if(user){
              this.router.navigateByUrl('/')
            }

          }
        })
  }
  ngOnInit(): void {

   
    this.initializeForm()
  }

  ngAfterViewInit(){
    const script1=this.renderer2.createElement('script')
    script1.src='https://accounts.google.com/gsi/client'
    script1.async='true'
    script1.defer='true'
    this.renderer2.appendChild(this._document.body,script1)
  }
   
  initializeForm(){

    this.registerForm = this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      lastName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      email:['',[Validators.required]],//Validators.pattern("")
      password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]]
    })

  }

  register(){
    this.submitted=true
    this.errorMessage=[]

    if(this.registerForm.valid){


      this.accountService.register(this.registerForm.value).subscribe({
        next:(response:any)=>{
          console.log(response.title)
          // this.sharedService.showNotification(true, response.value.title,response.value.message)
          this.router.navigateByUrl('/account/login')
          console.log(response)
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

}
