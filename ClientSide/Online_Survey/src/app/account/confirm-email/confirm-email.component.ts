import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../shared/Models/user';
import { ConfirmEmail } from '../../shared/Models/confirmEmailDto';


@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {


  success=true
  constructor(private accountService:AccountService,private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {

    this.accountService.user$.pipe(take(1)).subscribe({
      next:(user:User | null)=>{
        if(user){
          this.router.navigateByUrl('/')
        }
        else{
          this.activatedRoute.queryParamMap.subscribe({
            next:(params : any) =>{
              console.log(params.get('token'))
              console.log(params.get('email'))

              const confirmEmail: ConfirmEmail={
                token:params.get('token'),
                email:params.get('email')
              }

              this.accountService.confirmEmail(confirmEmail).subscribe({
                next:(response:any)=>{
                 
                },
                error:error=>{
                  this.success=false
                 
                }
              })
            }
          })
        }
      }
    })
    
  }

  resendEmailConfirmationLink(){

    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link')
  }

}
